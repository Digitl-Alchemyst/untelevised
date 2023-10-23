import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'keyEvent',
  title: 'Key Event',
  type: 'document',
  fields: [
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date/Time',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'eventTag',
      title: 'Event Tag',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'eventTag' } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const { title, date } = selection;
      return {
        title,
        subtitle: title && date ? new Date(date).toLocaleString() : 'No date',
      };
    },
  },
});
