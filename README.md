# mdJournal - Drag-n-drop blogging.

![screenshot of mdJournal website](/screenshot.png)

Markdown is easy, so blogging with it should be as well. mdJournal is a drag-n-drop blogging platform where you simply drop in a .md/.markdown file to publish a post.

## Technology

mdJournal is built using NextJS, Typescript, TailwindCSS and Supabase. The user flow is as follows:

1. Authenticated or annoymous user drops in a markdown file on the homepage
2. User is prompted to login or signup via Supabase if unauthenticated
3. Markdown file is uploaded to Supabase bucket
4. User is taken to their profile where they can see the new post
5. User clicks on post, app fetches file from Supabase bucket and renders it using Remark and Tailwind Typography libraries

## Local development

Clone the repo, run an `npm install` followed by `npm run dev` to start the development server. You'll need a `.env.local` file with the following keys:

```
NEXT_PUBLIC_SUPABASE_URL: <YOUR SUPABASE URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY: <YOUR SUPABASE ANAON KEY>
```

## Supabase setup

### Storage

- posts

### Database

- profiles
  - id uuid
  - updated_at timestamptz
  - username text
  - full_name text
  - avatar_url text
  - website text
- posts
  - id int8
  - user_id uuid
  - updated_at timestamptz
  - file_url text
  - original_file_name text

![database schema diagram](/schema.png)

## Contributing

All contributions are welcome! Please review any open issues and submit a PR with proposed changes.

Furthermore, you can help finacially support the project by visiting [Buy Me a Coffee](https://www.buymeacoffee.com/devalexwhite).
