-----------------BEGIN: Script to be run at Publisher '04AD0112AF26'-----------------
use [Sales]
exec sp_addsubscription 
@publication = N'SnapshotRepl', 
@subscriber = N'127.0.0.1,1435', 
@destination_db = N'Sales', 
@subscription_type = N'Push', 
@sync_type = N'automatic', 
@article = N'all', 
@update_mode = N'read only', 
@subscriber_type = 0

exec sp_addpushsubscription_agent 
@publication = N'SnapshotRepl', 
@subscriber = N'127.0.0.1,1435', 
@subscriber_db = N'Sales', 
@job_login = null, 
@job_password = null, 
@subscriber_security_mode = 0, 
@subscriber_login = N'sa', 
@subscriber_password = null, 
@frequency_type = 64, 
@frequency_interval = 0, 
@frequency_relative_interval = 0, 
@frequency_recurrence_factor = 0, 
@frequency_subday = 0, 
@frequency_subday_interval = 0, 
@active_start_time_of_day = 0, 
@active_end_time_of_day = 235959, 
@active_start_date = 20230620, 
@active_end_date = 99991231, 
@enabled_for_syncmgr = N'False', 
@dts_package_location = N'Distributor'
GO
-----------------END: Script to be run at Publisher '04AD0112AF26'-----------------


DECLARE @subscriber AS sysname
DECLARE @subscriber_db AS sysname
DECLARE @subscriberLogin AS sysname
DECLARE @subscriberPassword AS sysname
--SET @subscriber = N'127.0.0.1,1434' -- for example, MSSQLSERVER
SET @subscriber = N'000f1e2cb138' -- for example, MSSQLSERVER
SET @subscriber_db = N'Sales'
SET @subscriberLogin = N'sa'
SET @subscriberPassword = N'2011laducHai'

use [Sales]
exec sp_addsubscription 
@publication = N'SnapshotRepl', 
@subscriber = @subscriber,
@destination_db = @subscriber_db, 
@subscription_type = N'Push', 
@sync_type = N'automatic', 
@article = N'all', 
@update_mode = N'read only', 
@subscriber_type = 0

exec sp_addpushsubscription_agent 
@publication = N'SnapshotRepl', 
@subscriber = @subscriber,
@subscriber_db = @subscriber_db, 
@subscriber_security_mode = 0, 
@subscriber_login = @subscriberLogin,
@subscriber_password = @subscriberPassword,
@frequency_type = 1,
@frequency_interval = 0, 
@frequency_relative_interval = 0, 
@frequency_recurrence_factor = 0, 
@frequency_subday = 0, 
@frequency_subday_interval = 0, 
@active_start_time_of_day = 0, 
@active_end_time_of_day = 0, 
@active_start_date = 0, 
@active_end_date = 19950101
GO

