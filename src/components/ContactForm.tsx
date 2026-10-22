"use client";

import { useState } from "react";

/*
 * Right column of the Contact page — Figma "contact/desktop" node 553:9537:
 * intro (24/32), 36px gap, then a 2-column form grid (24px col gap, 16px row
 * gap). Each field: 14/20 label inset 16px, 8px gap, 1px grey-400 border,
 * 12px radius, 16/24 grey-500 placeholder, plus a 16px supporting-text row
 * (reserved here as pb-5) for future validation messages.
 */

const FIELD_CLASS =
  "block w-full rounded-xl border border-grey-400 py-3 pr-3 pl-4 text-base/6 placeholder:text-grey-500 focus:border-purple-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40";

function InputField({
  id,
  name,
  inputType,
  placeholder,
  className = "",
}: {
  id: string;
  name: string;
  inputType: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`pb-5 ${className}`}>
      <label className="mb-2 block pl-4 text-sm/5" htmlFor={id}>
        {name}
      </label>
      <input
        className={FIELD_CLASS}
        type={inputType}
        id={id}
        name={id}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // There is no submission backend yet; this only validates and resets.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      new FormData(form);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="font-omnes text-grey-800 min-w-0 lg:w-159.5 lg:max-w-159.5 lg:flex-1">
      <p className="text-xl/7 sm:text-2xl/8">
        Wanna connect with us about a project, partnership, or anything else?
        Shoot us an email at{" "}
        <a className="font-semibold" href="mailto:codethechangeyyc@gmail.com">
          codethechangeyyc@gmail.com
        </a>
        !
      </p>
      <form
        className="mt-9 grid gap-x-6 gap-y-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <InputField
          id="name"
          name="Name"
          inputType="text"
          placeholder="Your full name"
        />
        <InputField
          id="email"
          name="Email"
          inputType="email"
          placeholder="you@example.com"
        />
        <InputField
          className="md:col-span-2"
          id="subject"
          name="Subject"
          inputType="text"
          placeholder="Ex: Partnership Inquiry"
        />
        <div className="pb-5 md:col-span-2">
          <label className="mb-2 block pl-4 text-sm/5" htmlFor="message">
            Message
          </label>
          <textarea
            className={FIELD_CLASS}
            id="message"
            name="message"
            placeholder="Anything you’d like us to know"
            rows={1}
            required
          />
        </div>
        <button
          className="flex w-full cursor-pointer content-center justify-center gap-4 rounded-full bg-purple-500 px-3 py-2 text-xl font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 md:col-span-2"
          type="submit"
        >
          Send Your Message
          {/*A crude paper airplane svg, might be better to replace it with an image*/}
          <svg
            className="block fill-none stroke-current stroke-3"
            aria-hidden="true"
            width="40"
            height="30"
            viewBox="-2 -2 44 34"
          >
            <polyline points="5,15 0,0 40,15 0,30 5,15 20,15" />
          </svg>
        </button>
        <p
          className="text-base/6 md:col-span-2"
          role="status"
          aria-live="polite"
        >
          {status === "success" && "Your message has been received!"}
          {status === "error" && "Something went wrong. Please try again."}
        </p>
      </form>
    </div>
  );
}
