"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "./toast";
import { registerUser } from "@/lib/auth";

interface SignupFormData {
  fullName: string;
  studentEmail: string;
  phoneNumber: string;
  dateOfBirth: string;
  department: string;
  matricNumber: string;
  password: string;
  confirmPassword: string;
}

const fields: {
  name: keyof SignupFormData;
  label: string;
  placeholder: string;
  type: string;
  span: string;
}[] = [
  { name: "fullName", label: "Full name", placeholder: "Ada Lovelace", type: "text", span: "md:col-span-12" },
  { name: "studentEmail", label: "Student email", placeholder: "name@student.babcock.edu.ng", type: "email", span: "md:col-span-7" },
  { name: "phoneNumber", label: "Phone", placeholder: "08012345678", type: "tel", span: "md:col-span-5" },
  { name: "dateOfBirth", label: "Date of birth", placeholder: "", type: "date", span: "md:col-span-6" },
  { name: "matricNumber", label: "Matric no.", placeholder: "21/0123", type: "text", span: "md:col-span-6" },
  { name: "department", label: "Department", placeholder: "Computer Science", type: "text", span: "md:col-span-12" },
  { name: "password", label: "Password", placeholder: "••••••••", type: "password", span: "md:col-span-6" },
  { name: "confirmPassword", label: "Confirm password", placeholder: "••••••••", type: "password", span: "md:col-span-6" },
];

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    studentEmail: "",
    phoneNumber: "",
    dateOfBirth: "",
    department: "",
    matricNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const emailRegex = /^[^\s@]+@student\.babcock\.edu\.ng$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setToast(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

    if (!emailRegex.test(formData.studentEmail)) {
      setToast({ message: "Use a valid @student.babcock.edu.ng email.", type: "error" });
      setIsLoading(false); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setToast({ message: "Passwords do not match.", type: "error" });
      setIsLoading(false); return;
    }
    if (formData.password.length < 8) {
      setToast({ message: "Password must be at least 8 characters.", type: "error" });
      setIsLoading(false); return;
    }
    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      setToast({ message: "Phone must be 11 digits.", type: "error" });
      setIsLoading(false); return;
    }
    if (!formData.fullName.trim() || !formData.department.trim() || !formData.matricNumber.trim()) {
      setToast({ message: "Every field is required.", type: "error" });
      setIsLoading(false); return;
    }

    const result = await registerUser(formData.studentEmail, formData.password, formData.fullName);
    if (!result.ok) {
      setToast({ message: result.reason, type: "error" });
      setIsLoading(false);
      return;
    }
    setToast({ message: "Account created. Redirecting…", type: "success" });
    setTimeout(() => router.push("/login"), 1400);
  };

  const handleToastClose = () => {
    setToast(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-paper text-ink">
      <div className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-12 px-6 md:px-12">
        <aside className="col-span-12 hidden flex-col justify-between py-12 md:col-span-4 md:flex">
          <a href="/" className="font-serif italic text-2xl tracking-editorial">
            Chatmate<span className="text-emerald">.</span>
          </a>
          <div className="reveal">
            <p className="mb-6 font-mono text-eyebrow uppercase text-emerald">◇ &nbsp; New here</p>
            <h1 className="font-serif text-[clamp(2.5rem,4vw,3.6rem)] leading-[1.02] tracking-tightest">
              A few details,
              <br />
              and then we <span className="italic">listen.</span>
            </h1>
            <p className="mt-8 max-w-[32ch] text-sm leading-relaxed text-ink/65">
              We ask only what we need to verify you as a student and keep the space safe.
            </p>
          </div>
          <span className="font-mono text-eyebrow uppercase text-ash">Fig. 02 — Onboarding</span>
        </aside>

        <section className="col-span-12 flex items-center py-12 md:col-span-8 md:pl-16 md:py-16">
          <form onSubmit={handleSubmit} className="reveal w-full">
            <p className="mb-3 font-mono text-eyebrow uppercase text-ash md:hidden">◇ New here</p>
            <h2 className="mb-10 font-serif text-3xl tracking-editorial md:hidden">Create your account.</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-7 md:grid-cols-12">
              {fields.map((f) => (
                <label key={f.name} className={`field-underline block ${f.span}`}>
                  <span className="mb-2 block font-mono text-eyebrow uppercase text-ash">{f.label}</span>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    value={formData[f.name]}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink placeholder:text-ash/70 outline-none"
                  />
                </label>
              ))}
            </div>

            <div className="mt-12 flex flex-col-reverse items-start gap-6 md:flex-row md:items-center md:justify-between">
              <p className="font-mono text-eyebrow uppercase text-ash">
                Have an account?{" "}
                <a href="/login" className="text-ink underline-offset-4 hover:text-emerald hover:underline">
                  Sign in
                </a>
              </p>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-magnetic group inline-flex items-center gap-3 bg-ink px-7 py-4 text-paper hover:bg-emerald-deep disabled:opacity-60"
              >
                <span className="font-mono text-eyebrow uppercase">
                  {isLoading ? "Creating…" : "Create account"}
                </span>
                <span className="font-mono text-sm transition-transform duration-500 ease-liquid group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
}
