--
--	one time use only (this sql should be used first)
--
-- To run:
--	1. start mysql: go to cmd as Administrator, enter 'net start mysql80'
--	2. logon to mysql: mysql -u user99 -puser99
--	3. source or \. c:/nodejs_workspace/COM3105/create_customer_table.sql
--	4. logoff, and stop mysql.
--

-- Process of Creating User 'user99'

CREATE USER user99@localhost IDENTIFIED BY 'user99';

ALTER USER 'user99'@localhost IDENTIFIED WITH mysql_native_password BY 'user99';

flush privileges;

-- Process of Creating Database 'com3105'

CREATE DATABASE com3105;

-- Process of Granting access to 'com3105'

GRANT ALL PRIVILEGES com3105.* TO 'user99'@localhost;