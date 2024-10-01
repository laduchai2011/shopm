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