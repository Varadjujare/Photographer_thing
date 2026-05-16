"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya & Rahul",
    event: "Wedding in Udaipur",
    text: "Prajwal didn't just take photos; he captured the soul of our wedding. Every time we look at our album, we are transported back to those magical three days. His unobtrusive style and cinematic eye are truly unmatched.",
  },
  {
    name: "Ananya Sharma",
    event: "Fashion Editorial",
    text: "Working with Prajwal was an absolute dream. He has an incredible ability to make you feel comfortable while directing you to create Vogue-worthy shots. The final images exceeded all my expectations.",
  },
  {
    name: "Vikram & Sneha",
    event: "Pre-Wedding in Kashmir",
    text: "We wanted something different for our pre-wedding shoot, and Prajwal delivered a masterpiece. He braved the freezing temperatures with us and created art that we will cherish for a lifetime.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-5 pointer-events-none"
        style={{ width: 600, height: 600, background: "var(--gold)" }}
      />

      {/* ✅ Full-width container — matches Booking section padding */}
      <div className="w-full px-6 md:px-10 xl:px-16 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block h-px w-10" style={{ background: "var(--gold)", opacity: 0.5 }} />
            <p className="text-label">Testimonials</p>
            <span className="block h-px w-10" style={{ background: "var(--gold)", opacity: 0.5 }} />
          </div>

          <h2 className="heading-section mb-6">Client Stories</h2>
          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            The greatest reward is the joy of the people I photograph.
            Here is what they have to say about their experience.
          </p>
        </motion.div>

        {/* Grid — full width, 3 equal columns */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="p-8 lg:p-10 border rounded-3xl relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                borderColor: "var(--border-color)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    style={{ fill: "var(--gold)", color: "var(--gold)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-sm leading-relaxed mb-10 italic"
                style={{ color: "var(--muted)" }}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-auto">
                <p
                  className="text-lg mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  {testimonial.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}