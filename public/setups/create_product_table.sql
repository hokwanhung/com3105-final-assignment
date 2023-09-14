--
--	one time use only
--
-- To run:
--	1. start mysql: go to cmd as Administrator, enter 'net start mysql80'
--	2. logon to mysql: mysql -u user99 -puser99
--	3. source or \. c:/nodejs_workspace/COM3105/create_product_table.sql
--	4. logoff, and stop mysql.
--

use com3105;

----------------------
-- create product
-- 
----------------------

DROP TABLE product;

CREATE TABLE product (
prod_id INT NOT NULL AUTO_INCREMENT,
prod_desc VARCHAR(20) NOT NULL,
prod_price float NOT NULL,
PRIMARY KEY (prod_id)
);

desc product;

INSERT INTO product VALUES (1, 'blueberry', 2.98),
(2, 'pomegramate', 4.5),
(3, 'orange', 9.98);

