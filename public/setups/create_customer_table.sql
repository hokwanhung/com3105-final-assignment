--
--	one time use only
--
-- To run:
--	1. start mysql: go to cmd as Administrator, enter 'net start mysql80'
--	2. logon to mysql: mysql -u user99 -puser99
--	3. source or \. c:/nodejs_workspace/COM3105/create_customer_table.sql
--	4. logoff, and stop mysql.
--

use com3105;

----------------------
-- create customer (added password column)
-- 
----------------------

DROP TABLE customer;

CREATE TABLE customer (
cust_id INT NOT NULL AUTO_INCREMENT,
cust_username VARCHAR(20) NOT NULL,
cust_password VARCHAR(64) NOT NULL,
cust_email VARCHAR(40) NOT NULL,
cust_name VARCHAR(20) NOT NULL,
cust_phone varchar(12),
cust_credit_limit FLOAT NOT NULL,
PRIMARY KEY (cust_id)
);

desc customer;

INSERT INTO customer VALUES (null, 'cust1', '$argon2id$v=19$m=51200,t=4,p=6$iGXgwH+cZqUqr/Ehg8tplA$PYR8fpd8qfXUHWwqkpDcB2lXqYUCOjPfS55vDslDgo7J3krLbNRngw', 'cust1@xyz.com', 'Cust1', '415-123-4567', 5000),
(null, 'cust2', '$argon2id$v=19$m=51200,t=4,p=6$IBHvwYTFUDFFHXF4lIB+Lw$4oKsQevJYo+C9obVw5EithaqD+YyqLUr0YXhIvKDn2UB9GSmbgMXhg', 'cust2@xyz.com', 'Cust2', '415-234-5678', 6000),
(null, 'cust3', '$argon2id$v=19$m=51200,t=4,p=6$gr2MfVAC9jtu65MLM4OeLw$h1KuJ6spZuwibdFxiLPGVvYq5FdoTOhMhBMtpxCzhR692DaGKhzuQw', 'cust3@xyz.com', 'Cust3', '415-345-6789', 5000),
(null, 'cust4', '$argon2id$v=19$m=51200,t=4,p=6$0fR4Y6knLx72FGsmKR+IrQ$wshUPekPEmiofG5cuCPX/3f+HXsrDC4qIJiMNDjbWBakAd4WAPFv1Q', 'cust4@xyz.com', 'Cust4', '415-456-7890', 5000);