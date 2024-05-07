SELECT * FROM OrderMedications WHERE uuid_orderMedication = '1ec870fb-326e-49ab-801d-c03f993c493f'

BEGIN TRANSACTION
UPDATE OrderMedications 
SET uuid_doctorOrPharmacist = '51214181-6b7e-4acd-bbc9-3a565cc4c303'
WHERE uuid_orderMedication = '84396e4b-2652-4671-9d58-c4c710c4b839'

ROLLBACK
COMMIT

SELECT resource_type, request_mode, resource_description
FROM sys.dm_tran_locks
WHERE resource_type <> 'shopm'


ALTER TABLE CaseRecords
ADD pageTotal int;

UPDATE CaseRecords
SET pageTotal = 1

ALTER TABLE Users
ADD avatar nvarchar(255);

ALTER TABLE CaseRecordPages
ADD status nvarchar(255) NOT NULL DEFAULT 'notComplete';

ALTER TABLE CaseRecordPages
DROP COLUMN status;

UPDATE CaseRecordPages
SET status = 'botComplete'

DELETE FROM CaseRecords


SELECT * FROM Users
SELECT count(1) FROM Users


USE datatest;
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id INT IDENTITY(1,1) NOT NULL,
	client_name VARCHAR(32) NOT NULL,
	modification_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

	CONSTRAINT PK_id PRIMARY KEY(id),
);

DELETE FROM CaseRecords
go

DROP TABLE CaseRecords
go
UPDATE CaseRecords
SET status='notComplete'
WHERE id=1
go

UPDATE CaseRecordDescriptions
SET status='notComplete'
go

UPDATE CaseRecordImages
SET status='notComplete'
go

UPDATE CaseRecordPrescriptions
SET status='notComplete'
go

UPDATE CaseRecordMedications
SET status='notComplete'
go

DELETE FROM OrderMedications
go
DELETE FROM Histories
go
DELETE FROM Transports
go
DELETE FROM PaymentMedications
go
UPDATE OrderMedications
SET status='notComplete'
WHERE id=1
go

DELETE FROM CaseRecordDescriptions
GO

DELETE FROM CaseRecordImages
GO

DELETE FROM CaseRecordVideos
GO

DELETE FROM CaseRecordPrescriptions
GO

DELETE FROM CaseRecords
GO

DELETE FROM Users
GO

ALTER TABLE Medications
DROP COLUMN image;
go