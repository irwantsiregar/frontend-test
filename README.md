This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

## Admin Website Assignment (Next.js + TypeScript)

### Project Requirements

Create an admin website using Next.js with TypeScript, implementing the following pages with authentication:

#### Pages Structure

Login Page

Redirects to Inventories if already authenticated
Form with email/password fields
Login button that calls the API
Inventories Page (CRUD)
List all inventory items (table view)
Create new inventory items
Edit existing items
Delete items
Requires authentication
Users Page (CRUD)
List all users (table view)
Create new users
Edit existing users
Delete users
Requires authentication
Technical Requirements
Use Next.js App Router
TypeScript for type safety
Style with either:
Tailwind CSS (recommended), or
Material-UI (MUI)
Implement proper authentication flow using the provided API
Use React Hook Form for form handling (recommended)
Implement proper error handling
Responsive design
