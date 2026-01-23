export default {
  header: {
    badge: "Delivery & Returns",
    title: "Shipping Info",
    subtitle: "Everything you need to know about shipping and returns",
  },
  highlights: {
    fastShipping: {
      title: "Fast Shipping",
      description: "Orders processed within 1-2 business days",
    },
    securePackaging: {
      title: "Secure Packaging",
      description: "Carefully packed to ensure safe delivery",
    },
    easyReturns: {
      title: "Easy Returns",
      description: "7-day return policy for peace of mind",
    },
  },
  processing: {
    title: "Processing Time",
    subtitle: "How long before your order ships",
    content: "All orders are processed within",
    timeframe: "1-2 business days",
    after:
      "after payment confirmation. Orders placed on weekends or holidays will be processed on the next business day.",
    tracking:
      "You will receive a confirmation email with tracking information once your order has been shipped.",
  },
  delivery: {
    title: "Delivery Time & Costs",
    subtitle: "Shipping within Indonesia",
    standard: {
      title: "Standard Delivery (3-5 business days)",
      description: "Available to all major cities in Indonesia",
      cost: "Shipping cost calculated at checkout based on destination",
    },
    express: {
      title: "Express Delivery (1-2 business days)",
      description: "Available to Jakarta, Surabaya, and surrounding areas",
      cost: "Premium shipping option for faster delivery",
    },
    note: "Delivery times may vary depending on the courier service and your location. Remote areas may require additional delivery time.",
  },
  returns: {
    title: "Returns & Exchanges",
    subtitle: "Our 7-day return policy",
    intro:
      "We want you to love your Mewzu purchase. If you're not completely satisfied, you can return or exchange items within",
    timeframe: "7 days",
    introEnd: "of receiving your order.",
    conditions: {
      title: "Return Conditions",
      items: [
        "Items must be unworn, unwashed, and in original condition",
        "All original tags and packaging must be included",
        "Items must not have any signs of wear or alterations",
      ],
    },
    howTo: {
      title: "How to Return",
      steps: [
        "Contact us via email or WhatsApp within 7 days of receiving your order",
        "Provide your order number and reason for return",
        "We'll send you return instructions and address",
        "Ship the item back using a trackable shipping method",
        "Refund will be processed within 3-5 business days after we receive the return",
      ],
    },
    note: "Return shipping costs are the responsibility of the customer unless the return is due to a defect or error on our part.",
    noteLabel: "Note:",
  },
  issues: {
    title: "Order Issues",
    intro:
      "We take great care in packing and shipping your orders. However, if you receive a damaged, defective, or incorrect item, please contact us immediately.",
    resolve: {
      title: "We'll resolve it by:",
      items: [
        "Sending a replacement at no additional cost",
        "Issuing a full refund including original shipping costs",
        "Providing store credit for future purchases",
      ],
    },
    note: "Please include photos of the issue when contacting us to help us process your claim faster.",
  },
  cta: {
    question: "Have questions about shipping or returns?",
    link: "Contact us",
    suffix: "and we'll be happy to help.",
  },
} as const;
