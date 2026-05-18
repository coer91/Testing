 -- Store Module
SET @Module = 'Store';
SET @Icon   = 'fa-solid fa-boxes-stacked';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 1);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Store.sql
 
-- Location Module
SET @Module = 'Location';
SET @Icon   = 'fa-solid fa-location-dot';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 2);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Location.sql

-- Delivery Module
SET @Module = 'Delivery';
SET @Icon   = 'fa-solid fa-truck-ramp-box';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 3); 

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Delivery.sql

-- Change Module
SET @Module = 'Change';
SET @Icon   = 'fa-solid fa-arrows-turn-to-dots';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 4);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Change.sql

-- Shortage Module
SET @Module = 'Shortage';
SET @Icon   = 'fa-solid fa-boxes-packing';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 5);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Shortage.sql

-- Lot Module
SET @Module = 'Lot';
SET @Icon   = 'fa-solid fa-cart-flatbed';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 6);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Lot.sql

-- Defect Module
SET @Module = 'Defect';
SET @Icon   = 'fa-solid fa-file-circle-exclamation';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 7);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Defect.sql

-- Product Module
SET @Module = 'Product';
SET @Icon   = 'bi bi-box-seam-fill';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 8);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Product.sql

-- Recycle Module
SET @Module = 'Recycle';
SET @Icon   = 'fa-solid fa-recycle';
IF NOT EXISTS(SELECT 1 FROM TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module)
	INSERT INTO TblProjectsModules ([Name], Icon, ProjectId, MenuTypeId, ShowIndicator, [Sequence])
	VALUES (@Module, @Icon, @HWMXPDAId, @GRID, 0, 9);

SET @ModuleId = (SELECT Id FROM dbo.TblProjectsModules WHERE ProjectId = @HWMXPDAId AND [Name] = @Module);
:r .\HWMXPDA.Recycle.sql