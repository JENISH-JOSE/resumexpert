create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.resumes enable row level security;

grant select, insert, update, delete on public.resumes to authenticated;

drop policy if exists "Users can insert their own resumes" on public.resumes;
drop policy if exists "Users can read their own resumes" on public.resumes;
drop policy if exists "Users can update their own resumes" on public.resumes;
drop policy if exists "Users can delete their own resumes" on public.resumes;

create policy "Users can insert their own resumes"
on public.resumes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can read their own resumes"
on public.resumes
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can update their own resumes"
on public.resumes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own resumes"
on public.resumes
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can upload resumes to their own folder" on storage.objects;
drop policy if exists "Users can read resumes from their own folder" on storage.objects;
drop policy if exists "Users can update resumes in their own folder" on storage.objects;
drop policy if exists "Users can delete resumes from their own folder" on storage.objects;

create policy "Users can upload resumes to their own folder"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can read resumes from their own folder"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can update resumes in their own folder"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete resumes from their own folder"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);
