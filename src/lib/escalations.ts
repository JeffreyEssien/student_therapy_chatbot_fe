"use client";

const KEY = "chatmate.escalations";

export interface ConversationTurn {
  role: "user" | "model";
  text: string;
}

export interface Escalation {
  id: string;
  studentEmail: string;
  studentName: string;
  reason: string;
  conversation: ConversationTurn[];
  status: "pending" | "resolved";
  createdAt: number;
  resolvedAt?: number;
  resolvedNote?: string;
}

const SEED: Escalation[] = [
  {
    id: "seed-001",
    studentEmail: "amara.o@student.babcock.edu.ng",
    studentName: "Amara Okeke",
    reason: "Exam anxiety — keeps shaking before walking into the hall.",
    conversation: [
      { role: "user", text: "I have a final at 9am and my hands won't stop shaking." },
      {
        role: "model",
        text: "That shaking is your body telling you it's holding a lot right now. How long has this been going on — just tonight, or the past few days?",
      },
      { role: "user", text: "Every exam this semester. I think I need to talk to someone for real." },
    ],
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 14,
  },
  {
    id: "seed-002",
    studentEmail: "tunde.b@student.babcock.edu.ng",
    studentName: "Tunde Bakare",
    reason: "Family situation at home — wants to speak with a counselor today.",
    conversation: [
      { role: "user", text: "Things at home are really bad and I can't focus on anything." },
      {
        role: "model",
        text: "I'm really sorry you're holding that on top of school. What's happening at home, if you want to share?",
      },
    ],
    status: "pending",
    createdAt: Date.now() - 1000 * 60 * 47,
  },
  {
    id: "seed-003",
    studentEmail: "ifeoma.n@student.babcock.edu.ng",
    studentName: "Ifeoma Nwosu",
    reason: "Feeling disconnected after roommate moved out.",
    conversation: [
      { role: "user", text: "My roommate just moved out and I feel really alone." },
      { role: "model", text: "That kind of quiet hits harder than people expect. When did she leave?" },
    ],
    status: "resolved",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    resolvedAt: Date.now() - 1000 * 60 * 60 * 22,
    resolvedNote: "Connected with Counselor Adeyemi. Follow-up scheduled.",
  },
];

function read(): Escalation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Escalation[];
  } catch {
    /* fall through to seed */
  }
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return SEED;
}

function write(list: Escalation[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listEscalations(): Escalation[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}

export function createEscalation(
  input: Omit<Escalation, "id" | "status" | "createdAt">,
): Escalation {
  const e: Escalation = {
    ...input,
    id: `esc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    status: "pending",
    createdAt: Date.now(),
  };
  const list = read();
  list.unshift(e);
  write(list);
  return e;
}

export function resolveEscalation(id: string, note?: string): Escalation | null {
  const list = read();
  const i = list.findIndex((e) => e.id === id);
  if (i === -1) return null;
  list[i] = {
    ...list[i],
    status: "resolved",
    resolvedAt: Date.now(),
    resolvedNote: note,
  };
  write(list);
  return list[i];
}

export function reopenEscalation(id: string): Escalation | null {
  const list = read();
  const i = list.findIndex((e) => e.id === id);
  if (i === -1) return null;
  list[i] = { ...list[i], status: "pending", resolvedAt: undefined, resolvedNote: undefined };
  write(list);
  return list[i];
}
