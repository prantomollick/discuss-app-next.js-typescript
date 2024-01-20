# Discuss App Next.js | Typescript

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To install NextUI, run one of the following commands in your terminal:

```bash
npm i @nextui-org/react framer-motion
```

### Tailwind CSS Setup on my next project

```bash
// tailwind.config.js
    //...
    import { nextui } from "@nextui-org/react";

    module.exports = {
        content: [
            // ...
            "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        darkMode: "class",
        plugins: [nextui()],
    };
```

> Configure NextUIProvider at the root of `discuss app` application.

### Configure prisma into this project

```bash
npm i prisma

```

`Initialize prisma into this project`

```bash
npx prisma init --datasource-provider sqlite
```

> After declare all the model in schema.prisma file you need to create table on database, applying this prisma migrate command below:

```bash
npx prisma migrate dev

```

> After that command, it will want a name for complete the migration and generate the database table.
