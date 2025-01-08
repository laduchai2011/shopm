INSERT INTO dbo.Members (uuid_member, account, password, phone, fullName, avatar, childCompany, department, office, note, status, createdAt, updatedAt)
VALUES ('5465-46546-146541-64-54', 'laduchai', 'laduchai', '0789860854', 'La Duc Hai', '', 'shopm', 'IT', 'manager', '', 'normal','12-12-2 12:32:10 +01:00', '12-12-2 12:32:10 +01:00');

INSERT INTO dbo.Members (uuid_member, account, password, phone, fullName, avatar, childCompany, department, office, note, status, createdAt, updatedAt)
VALUES ('5465-46546-146541-64-77', 'laduchai1', 'laduchai1', '07898608541', 'La Duc Hai 1', '', 'shopm', 'technology', 'manager', '', 'normal','12-12-3 12:32:10 +01:00', '12-12-3 12:32:10 +01:00');


DELETE FROM ChestGroup_CHes;

DELETE FROM dbo.ChestGroups;

EXEC sp_who2;

SELECT 
    client_net_address AS ClientIPAddress,
    login_name AS LoginName,
    status,
    program_name AS ApplicationName,
    host_name AS HostName,
    database_id AS DatabaseID,
    connect_time AS ConnectTime
FROM 
    sys.dm_exec_connections AS conn
JOIN 
    sys.dm_exec_sessions AS sess
ON 
    conn.session_id = sess.session_id;


ALTER TABLE dbo.DepartmentMedications
DROP CONSTRAINT FK__Departmen__uuid___1332DBDC;
go

ALTER TABLE dbo.DepartmentMedications
ADD CONSTRAINT FK_DepartmentMedicationsDepartment
FOREIGN KEY (uuid_department) REFERENCES dbo.Departments(uuid_department);
go

ALTER TABLE dbo.Departments
ADD consultantCost float;
GO	

ALTER TABLE dbo.Department_CHes
ADD consultantCost float;
GO

ALTER TABLE dbo.Medications
ADD name nvarchar(255);
GO	

UPDATE dbo.Medications
SET name='name3' 
where uuid_medication='f2137aca-ff7a-434f-bb07-419abe9e86ac'
go

DELETE FROM dbo.Departments
go


DROP INDEX uuid_departmentChest_indexes ON Chests;
GO
ALTER TABLE Chests
DROP COLUMN uuid_departmentChest;
GO

INSERT INTO Chests (uuid_chest, name, title, type, size, maxAmount, note, status, uuid_chestGroup, createdAt, updatedAt)
VALUES ('dfd-98dsdf-434f4-34f-43', '1234', '123', 'no', '10', '5', '', 'normal', '5dedf171-42c8-46e6-9094-9c91f58402ad', '2025-01-06 14:30:00.1234567 +05:00', '2025-01-06 14:30:00.1234567 +05:00');
go

DELETE FROM Logs
go
DELETE FROM Log_CHes
go