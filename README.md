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

### Supabase setup

To develop locally, you'll need the Supbase CLI. Follow the insturctions [here](https://supabase.com/docs/guides/cli/getting-started) to install the CLI.

Once install, open a terminal in the root directory of mdJournal. Run the following:

```bash
supabase start
supabase db reset
```

This will start the local Supabase development environment and migrate the database. Take note of the terminal output. The 'Studio URL' provides a local Supabase interface for managing your database tables and authentication. You'll use this interface to manually create local users via the "authentication" tab.

### Local server

Create a '.env.local' file in the root directory of the project. Paste the following into the file:

```
NEXT_PUBLIC_SUPABASE_URL = <API URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY = <ANON KEY>
```

Change "API URL" and "ANON KEY" to the values printed to the terminal when you ran `supabase start` in the previous step. You can also run `supabase status` to print these values when Supabase is running locally.

Next, open a terminal in the root directory of the project and run the following to start the NextJS server:

```bash
npm install
npm run dev
```

You should now be able to access the project locally at `localhost:3000`.

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
