Create new folder called sanity-temp and cd into it run npm -y create sanity@latest

Move sanity.cli.ts and sanity.config.ts to your root dir

Move SchemaTypes to root

Merge Package json

// Create a temp directory a clone the chosen sanity template into it // Copy Package Json differences, update package versions, and run npm i

// Merge required and optional config files

Optional Config Merge tsconfig.json tailwindconfig .env.local.example netlify.toml

Required Config Merge sanity.cli.ts danity.config.ts next.config.js .gitignore

Not Needed Merge postcss.config.js next-env.d.ts

// Copy Types File,

// Merge Styles into global html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

Delete FIles and Folders Intro-Template

Inside your Project folder app directory create the following folders (admin) Move Folder studio from sanity temp / app to here new struc should be => (admin)/studio/[...index]/page.tsx Move [slug] folder from (personal) to blog folder in your project directory Move [slug] folder from (personal)/projects to gallery/[category] folder in your project directory Move API folder into your app directory Move Schemas folder into your /src dir In components Delete Global Save the Rest Save rest of sanity temp folder for later (user) Move the rest of your app directory to the user folder
