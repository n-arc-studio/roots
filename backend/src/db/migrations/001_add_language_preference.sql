-- Add language preference to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS language_preference VARCHAR(10) DEFAULT 'en';

-- Add comment about language options
COMMENT ON COLUMN users.language_preference IS 'User''s preferred language: en (English) or ja (日本語)';
