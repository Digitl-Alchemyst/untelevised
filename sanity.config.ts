import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemas';
import { myTheme } from '#/theme';
import StudioNavbar from '@/c/studio/StudioNavbar';
import Logo from '@/c/studio/Logo';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/studio',
  name: 'UnTelevised_CMS_Studio',
  title: 'UnTelevised Studio',
  projectId,
  dataset,
  plugins: [
    structureTool({}),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
    visionTool({}),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },
  theme: myTheme,
});
