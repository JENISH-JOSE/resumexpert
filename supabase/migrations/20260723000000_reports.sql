create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resume_name text not null,
  resume_url text,
  analysis jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.reports enable row level security;

grant select, insert, update, delete on public.reports to authenticated;

drop policy if exists "Users can insert their own reports" on public.reports;
drop policy if exists "Users can read their own reports" on public.reports;
drop policy if exists "Users can update their own reports" on public.reports;
drop policy if exists "Users can delete their own reports" on public.reports;

create policy "Users can insert their own reports"
on public.reports
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read their own reports"
on public.reports
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update their own reports"
on public.reports
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own reports"
on public.reports
for delete
to authenticated
using (auth.uid() = user_id);
