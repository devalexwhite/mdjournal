CREATE TYPE journalsize AS ENUM ('small', 'medium', 'large');

CREATE TABLE
journals (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id),
  title text not null,
  size journalsize not null default 'small',
  color text not null default '#ffffff',
  theme bigint nul null references journal_themes(id),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
)


