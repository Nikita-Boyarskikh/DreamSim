CREATE DATABASE dreamsim;
CREATE USER dreamsim WITH password 'dreamsim';
GRANT ALL ON DATABASE dreamsim TO dreamsim;
ALTER ROLE dreamsim SUPERUSER;
