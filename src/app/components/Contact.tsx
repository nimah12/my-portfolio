"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
        تماس با من
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="نام شما"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-gray-500"
        />
        <input
          type="email"
          placeholder="ایمیل شما"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-gray-500"
        />
        <textarea
          placeholder="پیام شما"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-white text-black font-bold rounded-lg px-4 py-3 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {status === "sending" ? "در حال ارسال..." : "ارسال پیام"}
        </button>

        {status === "sent" && (
          <p className="text-green-400 text-center">پیام شما ارسال شد ✅</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center">
            مشکلی پیش آمد، دوباره تلاش کنید.
          </p>
        )}
      </form>
    </section>
  );
}
