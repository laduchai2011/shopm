SELECT resource_type, request_mode, resource_description
FROM sys.dm_tran_locks
WHERE resource_type <> 'shopm'

BEGIN TRANSACTION
UPDATE OrderMedications
SET uuid_doctorOrPharmacist = '51214181-6b7e-4acd-bbc9-3a565cc4c303'
WHERE uuid_orderMedication = '11111'

ROLLBACK
COMMIT

SELECT * FROM OrderMedications WHERE uuid_orderMedication = '11111'

------------------ Order medication -----------------------
SELECT * FROM OrderAllMedications