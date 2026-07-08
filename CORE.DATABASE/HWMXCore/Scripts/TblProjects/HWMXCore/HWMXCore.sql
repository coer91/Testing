SET @Module = 'Structure';
SET @Icon   = 'iw-diagram-project';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'Estructura', N'구조');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXCoreId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXCoreId, @GRID, 1, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXCoreId AND TranslatoryId = @TranslatoryId);
:r .\HWMXCore.Structure.sql

--------------------------------------------------------------------------------------------------------------------------

SET @Module = 'Authorization';
SET @Icon   = 'iw-hand-stop-fill';
IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Module)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Module, N'Autorización', N'권한 부여');

SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Module);
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXCoreId AND TranslatoryId = @TranslatoryId)
	INSERT INTO TblProjectsModules (TranslatoryId, Icon, ProjectId, MenuTypeId, ShowIndicator, ShowIndex, [Sequence])
	VALUES (@TranslatoryId, @Icon, @HWMXCoreId, @LIST, 1, 0, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXCoreId AND TranslatoryId = @TranslatoryId);
:r .\HWMXCore.Authorization.sql

--------------------------------------------------------------------------------------------------------------------------