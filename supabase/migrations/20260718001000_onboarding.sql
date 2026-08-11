create table if not exists public.onboarding (
  user_id uuid primary key references auth.users(id) on delete cascade,
  experience_level text not null check (experience_level in ('student', 'fresher', 'professional')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.onboarding enable row level security;

grant select, insert, update on public.onboarding to authenticated;

drop policy if exists "Users can insert their own onboarding" on public.onboarding;
drop policy if exists "Users can read their own onboarding" on public.onboarding;
drop policy if exists "Users can update their own onboarding" on public.onboarding;

create policy "Users can insert their own onboarding"
on public.onboarding
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read their own onboarding"
on public.onboarding
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update their own onboarding"
on public.onboarding
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
