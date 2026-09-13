"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Send, MapPin, Clock } from "lucide-react";

import { API_URL } from "@/lib/api";
import type { Profile } from "@/lib/types";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.256 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

interface ApiErrorBody {
  error?: { message?: string };
}

export default function Contact({ profile }: { profile: Profile }) {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    ...profile.socials.map((social) => ({
      icon: social.label === "LinkedIn" ? LinkedinIcon : GithubIcon,
      label: social.label,
      value: social.value,
      href: social.href,
    })),
  ];
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".section-reveal")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("visible"), i * 100);
              });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const payload = (await response
          .json()
          .catch(() => null)) as ApiErrorBody | null;
        throw new Error(
          payload?.error?.message ?? "Something went wrong. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Let&apos;s work together
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Whether you have a project in mind, need a technical advisor, or
            just want to chat — my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — info */}
          <div className="space-y-8">
            <div className="section-reveal">
              <h3 className="text-xl font-semibold text-white mb-4">
                Let&apos;s connect
              </h3>
              <p className="text-slate-400 leading-relaxed">
                I&apos;m currently available for freelance work, consulting
                engagements, and senior full-time roles. If you have an
                interesting project or opportunity, I&apos;d love to hear about
                it.
              </p>
            </div>

            <div className="section-reveal space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="section-reveal grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-indigo-400 mb-2" />
                <div className="text-white text-sm font-medium">Location</div>
                <div className="text-slate-400 text-sm">
                  {profile.location}
                </div>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <Clock className="w-5 h-5 text-violet-400 mb-2" />
                <div className="text-white text-sm font-medium">
                  Response time
                </div>
                <div className="text-slate-400 text-sm">
                  {profile.responseTime}
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="section-reveal">
            {submitted ? (
              <div className="glass-card rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <Send className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                <p className="text-slate-400">
                  Thanks for reaching out. I&apos;ll get back to you{" "}
                  {profile.responseTime.toLowerCase()}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setError(null);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs uppercase tracking-wider mb-1.5 block">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs uppercase tracking-wider mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs uppercase tracking-wider mb-1.5 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project inquiry, job opportunity..."
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all"
                  />
                </div>
                <div>
                  <label className="text-slate-400 text-xs uppercase tracking-wider mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project or what you have in mind..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/60 focus:bg-indigo-500/5 transition-all resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:opacity-90 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-indigo-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
