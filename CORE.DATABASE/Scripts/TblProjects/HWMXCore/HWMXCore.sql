-- Structure Module
SET @Module = 'Structure';
SET @Icon   = 'iw-diagram-project';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXCoreId, @GRID, 1, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module);
:r .\HWMXCore.Structure.sql

-- Authorization Module
SET @Module = 'Authorization';
SET @Icon   = 'iw-hand-stop-fill';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXCoreId, @LIST, 1, @Secuence);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module);
:r .\HWMXCore.Authorization.sql

-- Configuration Module
SET @Module = 'Configuration';
SET @Icon   = 'iw-gear-fill';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXCoreId, @LIST, 1, @Secuence); 

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXCoreId AND [Name] = @Module);
:r .\HWMXCore.Configuration.sql