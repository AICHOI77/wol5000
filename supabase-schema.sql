-- Supabase 데이터베이스 스키마 설정
-- 이 SQL을 Supabase 대시보드의 SQL Editor에서 실행하세요

-- leads 테이블 생성
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- events 테이블 생성
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  tag TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- instructors 테이블 생성
CREATE TABLE IF NOT EXISTS instructors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  img_url TEXT,
  expertise TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) 설정
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- leads 테이블 정책
CREATE POLICY "Enable read access for all users" ON leads
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (true);

-- events 테이블 정책
CREATE POLICY "Enable read access for all users" ON events
  FOR SELECT USING (true);

-- instructors 테이블 정책
CREATE POLICY "Enable read access for all users" ON instructors
  FOR SELECT USING (true);

-- 샘플 데이터 삽입
INSERT INTO events (title, date, time, tag, description) VALUES
('AI 기초 강의', '2024-01-15', '19:00', '무료', 'AI의 기본 개념과 활용법을 배우는 강의입니다.'),
('머신러닝 심화', '2024-01-22', '19:00', '유료', '고급 머신러닝 알고리즘과 실무 적용 사례를 다룹니다.'),
('딥러닝 프로젝트', '2024-01-29', '19:00', '무료', '실제 딥러닝 프로젝트를 함께 만들어보는 워크샵입니다.');

INSERT INTO instructors (name, role, img_url, expertise, bio) VALUES
('김AI', 'AI 전문가', '/instructors/kim-ai.jpg', 'Machine Learning, Deep Learning', '10년 경력의 AI 전문가로 다양한 프로젝트를 성공적으로 완료했습니다.'),
('박데이터', '데이터 사이언티스트', '/instructors/park-data.jpg', 'Data Analysis, Statistics', '빅데이터 분석과 통계학을 전문으로 하는 데이터 사이언티스트입니다.'),
('이코딩', '풀스택 개발자', '/instructors/lee-coding.jpg', 'Full Stack, AI Integration', 'AI와 웹 개발을 결합한 혁신적인 솔루션을 만드는 개발자입니다.');
