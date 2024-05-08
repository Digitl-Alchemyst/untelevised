import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schemas';
import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  title,
} from '@/lib/sanity/api';
import { myTheme } from '@/lib/sanity/theme';
import StudioNavbar from '@/c/studio/StudioNavbar';


export default defineConfig({
  basePath: studioUrl,

  name: 'UnTelevised_CMS_Studio',
  title: title,

  projectId: projectId,
  dataset: dataset,
  apiVersion: apiVersion,

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
