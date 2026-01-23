import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for managing announcements',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Announcement Type',
      type: 'string',
      options: {
        list: [
          { title: 'Banner (Top of Site)', value: 'banner' },
          { title: 'Modal (Popup)', value: 'modal' },
          { title: 'Section (Embedded)', value: 'section' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When should this announcement start showing? (Optional - shows immediately if not set)',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When should this announcement stop showing? (Optional - shows indefinitely if not set)',
    }),
    defineField({
      name: 'targetPages',
      title: 'Target Pages',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'All Pages', value: 'all' },
          { title: 'Homepage', value: '/' },
          { title: 'Products Page', value: '/products' },
          { title: 'About Page', value: '/about' },
          { title: 'Contact Page', value: '/contact' },
        ],
      },
      description: 'Where should this announcement appear? Leave empty to show on all pages.',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers show first. Used when multiple announcements are active.',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0).max(100),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle this to enable/disable the announcement without deleting it',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      isActive: 'isActive',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, type, isActive, startDate, endDate }) {
      const status = isActive ? '✓ Active' : '✗ Inactive'
      const dates = []
      if (startDate) dates.push(`From: ${new Date(startDate).toLocaleDateString()}`)
      if (endDate) dates.push(`To: ${new Date(endDate).toLocaleDateString()}`)
      const dateRange = dates.length > 0 ? ` (${dates.join(', ')})` : ''

      return {
        title: title,
        subtitle: `${type} - ${status}${dateRange}`,
      }
    },
  },
})
