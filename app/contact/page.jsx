"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import AppButton from "../components/AppButton";

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Name is required";
    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone is required";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitted(true);
      setValues({ name: "", email: "", phone: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-app section">
      <div className="flex items-center gap-2 text-sm text-text-muted mb-10">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-primary">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        <div className="border border-border-light rounded p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </span>
              <h3 className="font-medium">Call To Us</h3>
            </div>
            <p className="text-sm">We are available 24/7, 7 days a week.</p>
            <p className="text-sm">Phone: +8801611112222</p>
          </div>

          <hr className="border-border-light" />

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </span>
              <h3 className="font-medium">Write To US</h3>
            </div>
            <p className="text-sm">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm">Emails: customer@exclusive.com</p>
            <p className="text-sm">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div className="border border-border-light rounded p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className="w-full bg-background-light rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && <p className="text-primary text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  className="w-full bg-background-light rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.email && <p className="text-primary text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="Your Phone *"
                  className="w-full bg-background-light rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.phone && <p className="text-primary text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder="Your Massage"
              rows={8}
              className="w-full bg-background-light rounded px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
            />

            {submitted && (
              <p className="text-sm text-success">
                Message sent — we&apos;ll get back to you within 24 hours.
              </p>
            )}

            <div className="flex justify-end">
              <AppButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Massage"}
              </AppButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
