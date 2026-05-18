"use client";

export default function Footer() {
  return (
    <footer className="relative w-full bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 md:px-12">
        {/* Oversized wordmark */}
        <h2 className="font-serif italic text-[clamp(4rem,18vw,18rem)] leading-[0.85] tracking-tightest text-paper/95">
          chatmate<span className="text-emerald">.</span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-10 border-t border-paper/10 pt-10">
          <div className="col-span-12 md:col-span-5">
            <p className="max-w-[36ch] font-serif text-xl leading-snug text-paper/85">
              A 24/7 companion for the student mind — gentle, anonymous, always within reach.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-paper/45 mb-4">Navigate</p>
            <ul className="space-y-2 font-sans text-sm">
              {["Home", "Features", "Contact", "Privacy"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="inline-block text-paper/85 transition-colors duration-500 ease-liquid hover:text-emerald"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="font-mono text-eyebrow uppercase text-paper/45 mb-4">Reach out</p>
            <ul className="space-y-2 font-sans text-sm text-paper/85">
              <li>support@chatmate.com</li>
              <li>+234 943 123 4567</li>
              <li>Babcock University, Ilishan-Remo</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-6 font-mono text-eyebrow uppercase text-paper/45 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Chatmate — All rights reserved</span>
          <span>Made with quiet attention</span>
        </div>
      </div>
    </footer>
  );
}
