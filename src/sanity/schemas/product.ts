import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short catchy phrase for the product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scene",
      title: "Scene",
      type: "text",
      description: "The scene or setting depicted in the design",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "text",
      description: "The story behind the design",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "baseColor",
      title: "Base Color",
      type: "string",
      description: 'Main t-shirt color (e.g., "Sky Blue", "Natural Beige")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artColor",
      title: "Art Color",
      type: "string",
      description:
        'Primary color of the artwork (e.g., "Navy Blue", "Forest Green")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "XS" },
          { title: "S", value: "S" },
          { title: "M", value: "M" },
          { title: "L", value: "L" },
          { title: "XL", value: "XL" },
          { title: "XXL", value: "XXL" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Important for SEO and accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "view",
              title: "View Type",
              type: "string",
              options: {
                list: [
                  { title: "Front", value: "front" },
                  { title: "Back", value: "back" },
                  { title: "Detail", value: "detail" },
                  { title: "Lifestyle", value: "lifestyle" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "view",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      description: "Display this product on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "externalLinks",
      title: "External Marketplace Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Shopee", value: "shopee" },
                  { title: "TikTok Shop", value: "tiktok" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: false }),
            },
            {
              name: "available",
              title: "Available",
              type: "boolean",
              description:
                "Is this product currently available on this platform?",
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "images.0.image",
    },
  },
});
