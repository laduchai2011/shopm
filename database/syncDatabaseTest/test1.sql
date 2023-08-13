use test
go

CREATE TABLE Persons (
    PersonID int,
    Name varchar(255)
);
go

INSERT INTO Persons
VALUES (1, 'hai1');
INSERT INTO Persons
VALUES (2, 'hai2');
INSERT INTO Persons
VALUES (3, 'hai3');
INSERT INTO Persons
VALUES (4, 'hai4');
INSERT INTO Persons
VALUES (5, 'hai5');
INSERT INTO Persons
VALUES (6, 'hai6');
INSERT INTO Persons
VALUES (7, 'hai7');
INSERT INTO Persons
VALUES (8, 'hai8');

select * from Persons

DELETE FROM Persons WHERE PersonID=10;