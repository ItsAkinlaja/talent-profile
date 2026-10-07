-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- UserInfoTB
create table if not exists "UserInfoTB" (
  id uuid primary key default uuid_generate_v4(),
  "firstName" varchar not null,
  "lastName" varchar not null,
  dob date not null,
  occupation varchar not null,
  gender varchar not null,
  "profilePhoto" text,
  "createdAt" timestamp with time zone default now(),
  "updatedAt" timestamp with time zone default now()
);

-- UserContactTB
create table if not exists "UserContactTB" (
  id uuid primary key default uuid_generate_v4(),
  "userId" uuid not null references "UserInfoTB"(id) on delete cascade,
  email varchar unique not null,
  "phoneNumber" varchar not null,
  fax varchar,
  "linkedInUrl" varchar,
  "createdAt" timestamp with time zone default now(),
  "updatedAt" timestamp with time zone default now()
);

-- UserAddressTB
create table if not exists "UserAddressTB" (
  id uuid primary key default uuid_generate_v4(),
  "userId" uuid not null references "UserInfoTB"(id) on delete cascade,
  address varchar not null,
  city varchar not null,
  state varchar not null,
  country varchar not null,
  "zipCode" varchar not null,
  "createdAt" timestamp with time zone default now(),
  "updatedAt" timestamp with time zone default now()
);

-- UserAcademicsTB
create table if not exists "UserAcademicsTB" (
  id uuid primary key default uuid_generate_v4(),
  "userId" uuid not null references "UserInfoTB"(id) on delete cascade,
  "schoolName" varchar not null,
  degree varchar,
  "fieldOfStudy" varchar,
  "startYear" integer,
  "endYear" integer,
  "createdAt" timestamp with time zone default now(),
  "updatedAt" timestamp with time zone default now()
);
