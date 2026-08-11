alter table public.users
add column if not exists onboarding_completed boolean not null default false;

update public.users
set onboarding_completed = true,
    updated_at = now()
where onboarding_completed = false
  and exists (
    select 1
    from public.onboarding
    where onboarding.user_id = users.id
  );
