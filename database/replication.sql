

/****** End: Script to be run at Distributor ******/

-- make sure your on the right server
SELECT @@version AS Version
SELECT @@SERVERNAME AS Server_Name


-------------------------------------------------------------------------------
DECLARE @distributor AS sysname
DECLARE @distributorlogin AS sysname
DECLARE @distributorpassword AS sysname
-- Specify the distributor name. Use 'hostname' command on in terminal to find the hostname
SET @distributor = N'98935de53a43'--in this example, it will be the name of the publisher
SET @distributorlogin = N'sa'
SET @distributorpassword = N'2011laducHai'
-- Specify the distribution database. 

use master
exec sp_adddistributor @distributor = @distributor -- this should be the hostname

-- Log into distributor and create Distribution Database. In this example, our publisher and distributor is on the same host
exec sp_adddistributiondb @database = N'distribution', @log_file_size = 2, @deletebatchsize_xact = 5000, @deletebatchsize_cmd = 2000, @security_mode = 0, @login = @distributorlogin, @password = @distributorpassword
GO

DECLARE @snapshotdirectory AS nvarchar(500)
SET @snapshotdirectory = N'/var/opt/mssql/data/ReplData/'

-- Log into distributor and create Distribution Database. In this example, our publisher and distributor is on the same host
use [distribution] 
if (not exists (select * from sysobjects where name = 'UIProperties' and type = 'U ')) 
       create table UIProperties(id int) 
if (exists (select * from ::fn_listextendedproperty('SnapshotFolder', 'user', 'dbo', 'table', 'UIProperties', null, null))) 
       EXEC sp_updateextendedproperty N'SnapshotFolder', @snapshotdirectory, 'user', dbo, 'table', 'UIProperties' 
else 
      EXEC sp_addextendedproperty N'SnapshotFolder', @snapshotdirectory, 'user', dbo, 'table', 'UIProperties'
GO

----------------------------------------------------------------
DECLARE @publisher AS sysname
DECLARE @distributorlogin AS sysname
DECLARE @distributorpassword AS sysname
-- Specify the distributor name. Use 'hostname' command on in terminal to find the hostname
SET @publisher = N'98935de53a43' 
SET @distributorlogin = N'sa'
SET @distributorpassword = N'2011laducHai'
-- Specify the distribution database. 

-- Adding the distribution publishers
exec sp_adddistpublisher @publisher = @publisher, 
@distribution_db = N'distribution', 
@security_mode = 0, 
@login = @distributorlogin, 
@password = @distributorpassword, 
@working_directory = N'/var/opt/mssql/data/ReplData', 
@trusted = N'false', 
@thirdparty_flag = 0, 
@publisher_type = N'MSSQLSERVER'
GO

--------------------------------------------------------------------
DECLARE @replicationdb AS sysname
DECLARE @publisherlogin AS sysname
DECLARE @publisherpassword AS sysname
SET @replicationdb = N'Sales'
SET @publisherlogin = N'sa'
SET @publisherpassword = N'2011laducHai'

use [Sales]
exec sp_replicationdboption @dbname = N'Sales', @optname = N'publish', @value = N'true'

-- Add the snapshot publication
exec sp_addpublication 
@publication = N'SnapshotRepl', 
@description = N'Snapshot publication of database ''Sales'' from Publisher ''<PUBLISHER HOSTNAME>''.',
@retention = 0, 
@allow_push = N'true', 
@repl_freq = N'snapshot', 
@status = N'active', 
@independent_agent = N'true'

exec sp_addpublication_snapshot @publication = N'SnapshotRepl', 
@frequency_type = 1, 
@frequency_interval = 1, 
@frequency_relative_interval = 1, 
@frequency_recurrence_factor = 0, 
@frequency_subday = 8, 
@frequency_subday_interval = 1, 
@active_start_time_of_day = 0,
@active_end_time_of_day = 235959, 
@active_start_date = 0, 
@active_end_date = 0, 
@publisher_security_mode = 0, 
@publisher_login = @publisherlogin, 
@publisher_password = @publisherpassword

-------------------------------------------------------------------
use [Sales]
exec sp_addarticle 
@publication = N'SnapshotRepl', 
@article = N'customer', 
@source_owner = N'dbo', 
@source_object = N'customer', 
@type = N'logbased', 
@description = null, 
@creation_script = null, 
@pre_creation_cmd = N'drop', 
@schema_option = 0x000000000803509D,
@identityrangemanagementoption = N'manual', 
@destination_table = N'customer', 
@destination_owner = N'dbo', 
@vertical_partition = N'false'

---------------------------------------------------------------------
DECLARE @subscriber AS sysname
DECLARE @subscriber_db AS sysname
DECLARE @subscriberLogin AS sysname
DECLARE @subscriberPassword AS sysname
--SET @subscriber = N'127.0.0.1,1435' -- for example, MSSQLSERVER
SET @subscriber = N'a963241b1ac0' -- for example, MSSQLSERVER
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

-------------------------------------
SELECT name, date_modified FROM msdb.dbo.sysjobs order by date_modified desc

USE msdb;   
--generate snapshot of publications, for example
EXEC dbo.sp_start_job N'98935de53a43-Sales-SnapshotRepl-A963241B1AC0-1'
GO

SELECT * from [Sales].[dbo].[CUSTOMER]