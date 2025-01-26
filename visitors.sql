create database visitors;
use visitors;

create table records (
Id int auto_increment primary key,
CustomerName varchar(100),
Designation varchar(200),
CompanyName varchar(300),
Country varchar(100),
City varchar(100),
MobileNo int,
PhoneNo int,
Email varchar(300),
Machines varchar(500),
MachineCondition varchar(200),
Guage varchar(100),
BookingDate date,
DeliveryDate date,
Date timestamp default current_timestamp,
UserId varchar(30),
Updated_at timestamp default null on update current_timestamp 
);

drop table records;

select * from records;
select * from users;
select * from visiting_cards;

create table users (
UserName varchar(100),
UserID varchar(100) primary key,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE records add column Yarn varchar(500), add column Fabric varchar(500);
alter table records drop column fabric;

ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';

update users set role = "admin" where UserId = 'admin';

create table visiting_cards (
Id int primary key auto_increment,
VisitorName varchar(200),
VisitingCard varchar(500),
Date timestamp default current_timestamp,
UserId varchar(30),
Updated_at timestamp default null on update current_timestamp 
);