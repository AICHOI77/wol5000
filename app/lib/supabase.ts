// Supabase 클라이언트 설정 (차후 연동용)

// TODO: .env.local 파일에 환경변수 추가
// NEXT_PUBLIC_SUPABASE_URL=your-project-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

/*
// 설치 필요: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 테이블 스키마 예시:
//
// -- leads 테이블
// create table leads (
//   id uuid default uuid_generate_v4() primary key,
//   name text not null,
//   phone text not null,
//   interest text not null,
//   created_at timestamp with time zone default timezone('utc'::text, now()) not null
// );
//
// -- events 테이블
// create table events (
//   id uuid default uuid_generate_v4() primary key,
//   title text not null,
//   date date not null,
//   time text,
//   tag text,
//   created_at timestamp with time zone default timezone('utc'::text, now()) not null
// );
//
// -- instructors 테이블
// create table instructors (
//   id uuid default uuid_generate_v4() primary key,
//   name text not null,
//   role text not null,
//   img_url text,
//   expertise text,
//   created_at timestamp with time zone default timezone('utc'::text, now()) not null
// );
//
// -- Row Level Security (RLS) 설정
// alter table leads enable row level security;
// create policy "Enable read access for authenticated users" on leads
//   for select using (auth.role() = 'authenticated');
// create policy "Enable insert for all users" on leads
//   for insert with check (true);
*/

export {}
