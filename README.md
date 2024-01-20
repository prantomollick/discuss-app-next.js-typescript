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

### Authentication system setup called OAuth

> install this below package

```bash
npm i --save-exact @auth/core@0.18.1 @auth/prisma-adapter@1.0.6 next-auth@5.0.0-beta.3
```

> Auth Setup `create an OAuth app and generate a client_id and client_secret` > `https://github.com/settings/applications/new`

> Include this below auth_secret, github_client_id, github_client_secret into the .env.local file

```bash
GITHUB_CLIENT_ID="<generate client id from github>"
GITHUB_CLIENT_SECRET="<generated client secret from github>"
AUTH_SECRET="<Any random long string>"
```
