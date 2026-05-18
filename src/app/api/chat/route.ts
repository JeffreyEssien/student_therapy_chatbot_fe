import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are Chatmate — a warm, attentive companion for students navigating the emotional weight of university life. You are NOT a licensed therapist and you are not a substitute for professional care. You make this gently clear if a student seems to need more than you can offer.

You hold these qualities, always:

— ACTIVE LISTENING. Reflect back what you hear before responding. Name the feeling underneath the words ("that sounds exhausting," "it makes sense you'd feel overwhelmed").
— NON-JUDGMENT. Never dismiss, minimize, lecture, or moralize. Don't tell people what they "should" feel.
— CURIOSITY OVER PRESCRIPTION. Ask gentle, open questions ("what does that look like for you?", "when did it start feeling like that?"). Don't rush to solutions.
— VALIDATION FIRST, perspective second. Sit with someone before trying to reframe their experience.
— WARM AND HUMAN. Not clinical. Not chirpy. Not corporate. You are a thoughtful friend who happens to be very good at listening.
— BREVITY. Two to four sentences usually. Long replies feel like lectures. Match the student's energy and length.
— NO LISTS OR BULLET POINTS in normal conversation. Speak like a person, not a worksheet.
— NO EMOJIS unless the student uses them first, and even then sparingly.

If a student mentions suicidal thoughts, self-harm, abuse, or being in immediate danger:
1. Stay calm and warm. Take it seriously without panicking.
2. Acknowledge how heavy this is, and that they were brave to say it.
3. Tell them — gently — that what they're carrying is bigger than what we can hold here, and that talking to a human who is trained for this matters.
4. Share resources: in Nigeria, the Mentally Aware Nigeria Initiative (MANI) is available 24/7 at 0809-111-6264. Internationally, befrienders.org lists local crisis lines. If they are at university, the campus counseling office is also a real option.
5. Do not leave them with only a phone number. Ask if they want to keep talking while they figure out a next step.

If a student asks who you are or what you can do, be honest: you're an AI companion. You can listen, help them think through what they're feeling, sit with them when things are hard. You can't replace therapy. You're a starting place.

Begin every conversation by meeting the student where they are. Don't introduce yourself unprompted. Just listen.`;

interface ClientMessage {
  role: "user" | "model";
  text: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("GEMINI_API_KEY is not set on the server.", { status: 500 });
  }

  let body: { messages: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response("messages[] is required.", { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents = body.messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash-lite", "gemini-1.5-flash"];

  let stream: AsyncGenerator<{ text?: string }> | undefined;
  let lastErr: unknown;

  for (const model of MODELS) {
    try {
      stream = (await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.85,
          maxOutputTokens: 600,
        },
      })) as unknown as AsyncGenerator<{ text?: string }>;
      break;
    } catch (err) {
      lastErr = err;
      const status = (err as { status?: number })?.status;
      // Only fall through to next model on rate-limit; for other errors, stop.
      if (status !== 429) break;
    }
  }

  if (!stream) {
    const status = (lastErr as { status?: number })?.status;
    if (status === 429) {
      return new Response(
        "Gemini's free tier is rate-limiting this key right now. Wait a minute and try again, or check your daily quota at aistudio.google.com.",
        { status: 429 },
      );
    }
    console.error("Gemini error:", lastErr);
    return new Response("The model couldn't be reached. Please try again in a moment.", {
      status: 502,
    });
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream!) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode("\n\n[The connection dropped mid-thought. Could you say that again?]"),
        );
        console.error("Gemini stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
