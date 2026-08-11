create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

grant select, insert, update on public.users to authenticated;

drop policy if exists "Users can insert their own row" on public.users;
drop policy if exists "Users can read their own row" on public.users;
drop policy if exists "Users can update their own row" on public.users;

create policy "Users can insert their own row"
on public.users
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can read their own row"
on public.users
for select
to authenticated
using (auth.uid() = id);

create policy "Users can update their own row"
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
