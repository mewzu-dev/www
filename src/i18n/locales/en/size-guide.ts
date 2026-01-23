export default {
  header: {
    badge: "Find Your Fit",
    title: "Size Guide",
    subtitle: "Find your perfect fit with our detailed measurements",
  },
  table: {
    title: "Size Measurements",
    subtitle: "All measurements are in centimeters (cm)",
    headers: {
      size: "Size",
      chest: "Chest",
      length: "Length",
      shoulder: "Shoulder",
      sleeve: "Sleeve",
    },
  },
  howToMeasure: {
    title: "How to Measure",
    guides: {
      chest: {
        title: "Chest",
        description:
          "Measure around the fullest part of your chest, keeping the tape horizontal.",
      },
      length: {
        title: "Length",
        description:
          "Measure from the highest point of the shoulder down to the hem.",
      },
      shoulder: {
        title: "Shoulder",
        description:
          "Measure from the edge of one shoulder to the other across the back.",
      },
      sleeve: {
        title: "Sleeve",
        description: "Measure from the shoulder seam to the sleeve hem.",
      },
    },
  },
  fitGuide: {
    title: "Fit Guide",
    tips: {
      regularFit: {
        title: "Regular Fit",
        description:
          "Our t-shirts have a classic, comfortable fit. Not too tight, not too loose - perfect for everyday wear.",
      },
      choosingSize: {
        title: "Choosing Your Size",
        description:
          "For the best fit, measure a t-shirt that fits you well and compare it to our size chart. If you're between sizes, we recommend sizing up for a more relaxed fit.",
      },
      material: {
        title: "Material",
        description:
          "Premium cotton blend that's soft, breathable, and maintains its shape after washing. Pre-shrunk to minimize size changes.",
      },
      unsure: {
        title: "Still Unsure?",
        description:
          "Contact us via WhatsApp or email, and we'll help you find the perfect size.",
      },
    },
  },
  note: "Please note that measurements may vary slightly (±1-2cm) due to the nature of handmade products. All measurements are taken with the garment laid flat.",
} as const;
