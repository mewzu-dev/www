export default {
  header: {
    badge: "Connect",
    title: "Get in Touch",
    subtitle: "We'd love to hear from you. Follow us or drop us a message.",
  },
  methods: {
    instagram: {
      title: "Instagram",
      description: "Follow our journey and latest designs",
    },
    tiktok: {
      title: "TikTok",
      description: "Watch our creative process",
    },
    email: {
      title: "Email",
      description: "For business inquiries and support",
    },
    whatsapp: {
      title: "WhatsApp",
      description: "Quick questions and direct orders",
      handle: "Chat with us",
    },
  },
  business: {
    title: "Business Inquiries",
    description:
      "Interested in collaborations, wholesale orders, or custom designs? We'd love to explore opportunities to work together.",
    emailPrompt: "Please reach out via email at",
    emailSuffix: "with details about your inquiry.",
  },
  responseTime: "We typically respond within 24-48 hours during business days",
} as const;
