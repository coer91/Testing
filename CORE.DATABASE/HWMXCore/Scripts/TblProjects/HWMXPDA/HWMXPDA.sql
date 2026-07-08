SET @Module = 'Store';
SET @Icon   = 'fa-solid fa-boxes-stacked';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Store.sql
 
--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Location';
SET @Icon   = 'fa-solid fa-location-dot';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'Ubicación', N'위치');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Location.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Delivery';
SET @Icon   = 'fa-solid fa-truck-ramp-box';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'Entrega', N'배송');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Delivery.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Change';
SET @Icon   = 'fa-solid fa-arrows-turn-to-dots';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Change.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Shortage';
SET @Icon   = 'fa-solid fa-boxes-packing';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Shortage.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Lot';
SET @Icon   = 'fa-solid fa-cart-flatbed';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'Lote', N'로트');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Lot.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Defect';
SET @Icon   = 'fa-solid fa-file-circle-exclamation';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);

:r .\HWMXPDA.Defect.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Product';
SET @Icon   = 'bi bi-box-seam-fill';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Product.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Recycle';
SET @Icon   = 'fa-solid fa-recycle';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'', N'');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXPDAId, @GRID, 0, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND TranslatoryId = @TranslatoryId);
:r .\HWMXPDA.Recycle.sql

--------------------------------------------------------------------------------------------------------------------------
