"use client";

const USERS_KEY = "chatmate.users";
const SESSION_KEY = "chatmate.session";

export interface StoredUser {
  email: string;
  passwordHash: string;
  fullName?: string;
  createdAt: number;
}

export interface Session {
  email: string;
  fullName?: string;
  loggedInAt: number;
}

export const DEMO_USER = {
  email: "demo@student.babcock.edu.ng",
  password: "chatmate2026",
  fullName: "Demo Student",
};

async function hash(input: string): Promise<string> {
  if (typeof window === "undefined") return input;
  const data = new TextEncoder().encode(`chatmate::${input}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function seedDemoUser() {
  if (typeof window === "undefined") return;
  const users = readUsers();
  if (users.some((u) => u.email === DEMO_USER.email)) return;
  users.push({
    email: DEMO_USER.email,
    fullName: DEMO_USER.fullName,
    passwordHash: await hash(DEMO_USER.password),
    createdAt: Date.now(),
  });
  writeUsers(users);
}

export async function registerUser(
  email: string,
  password: string,
  fullName?: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, reason: "An account with that email already exists." };
  }
  users.push({
    email,
    fullName,
    passwordHash: await hash(password),
    createdAt: Date.now(),
  });
  writeUsers(users);
  return { ok: true };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ ok: true; session: Session } | { ok: false; reason: string }> {
  await seedDemoUser();
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, reason: "No account found for that email." };
  const incoming = await hash(password);
  if (incoming !== user.passwordHash) {
    return { ok: false, reason: "Incorrect password." };
  }
  const session: Session = {
    email: user.email,
    fullName: user.fullName,
    loggedInAt: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, session };
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
