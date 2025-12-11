-- Create table for storing bill records
create table bill_records (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('GAS', 'ELECTRICITY')),
  created_at width_bucket timestamp with time zone default timezone('utc'::text, now()) not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  period_label text not null,
  bill_amount numeric not null,
  
  -- Consumption details
  total_consumption numeric not null,
  back_house_consumption numeric not null,
  front_house_consumption numeric not null,
  
  -- Readings Snapshot (Optional but recommended)
  street_reading_prev numeric,
  street_reading_curr numeric,
  internal_reading_prev numeric,
  internal_reading_curr numeric,
  
  -- Splits
  front_house_pay numeric not null,
  back_house_pay numeric not null,
  
  -- Status
  is_paid boolean default false
);

-- Enable Row Level Security (RLS)
alter table bill_records enable row level security;

-- Policy to allow anonymous read/write (since we are using a custom shared password for "admin" login)
-- This is simpler for this specific use-case than setting up full Supabase Auth users.
create policy "Allow public access"
  on bill_records
  for all
  using (true)
  with check (true);
