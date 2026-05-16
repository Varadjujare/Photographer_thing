"use client";

import { MessageCircle } from "lucide-react";

/**
 * WhatsApp Floating Button
 * Fixed bottom-right WhatsApp CTA with pulse animation.
 * Replace the phone number with the actual number.
 */
export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}
