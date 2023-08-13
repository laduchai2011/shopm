USE shopm
GO
exec sys.sp_MSrepl_createdatatypemappings;
GO

CREATE DATABASE Sales
GO
USE [SALES]
GO 
CREATE TABLE CUSTOMER([CustomerID] [int] NOT NULL, [SalesAmount] [decimal] NOT NULL)
GO 
INSERT INTO CUSTOMER (CustomerID, SalesAmount) VALUES (1,100),(2,200),(3,300)

INSERT INTO CUSTOMER (CustomerID, SalesAmount) VALUES (12,1200),(22,2200),(32,3200)

CREATE DATABASE Users
GO
USE [Users]
GO 
CREATE TABLE tableuser([id] [int] NOT NULL, [fullname] nvarchar(50) NOT NULL)
GO 
INSERT INTO tableuser (id, fullname) VALUES (2, 'hai2')

USE [user_sub]
GO 
CREATE TABLE tableuser([id] [int] NOT NULL, [fullname] nvarchar(50) NOT NULL)
GO 
INSERT INTO tableuser (id, fullname) VALUES (8, 'hai8')