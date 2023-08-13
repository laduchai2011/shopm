use sync_test
go

CREATE TABLE Persons (
    PersonID int,
    Name varchar(255)
);
go

INSERT INTO Persons
VALUES (11, 'hai11');
INSERT INTO Persons
VALUES (22, 'hai22');
INSERT INTO Persons
VALUES (33, 'hai33');
INSERT INTO Persons
VALUES (44, 'hai44');
INSERT INTO Persons
VALUES (55, 'hai55');
INSERT INTO Persons
VALUES (66, 'hai66');
INSERT INTO Persons
VALUES (77, 'hai77');

select * from Persons