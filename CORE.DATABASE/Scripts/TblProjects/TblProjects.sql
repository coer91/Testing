BEGIN
	DECLARE @IsActive    BIT = 1;
	DECLARE @ModuleId    INT;
	DECLARE @Module      VARCHAR(50);
	DECLARE @SubmoduleId INT;
	DECLARE @Submodule   VARCHAR(50);
	DECLARE @Page        VARCHAR(50);
	DECLARE @Path        VARCHAR(250);
	DECLARE @Icon        VARCHAR(80);
	DECLARE @ActiveKey   VARCHAR(100);
	DECLARE @Secuence    INT = 1;

	-- Menu Type
	DECLARE @LIST INT = 1;
	DECLARE @GRID INT = 2;

	IF NOT EXISTS(SELECT 1 FROM dbo.TblProjectsMenuType WHERE Id = @LIST)
		INSERT INTO dbo.TblProjectsMenuType (Id, [Name])
		VALUES (@LIST, 'LIST');
			
	IF NOT EXISTS(SELECT 1 FROM dbo.TblProjectsMenuType WHERE Id = @GRID)
		INSERT INTO dbo.TblProjectsMenuType (Id, [Name])
		VALUES (@GRID, 'GRID');  

	-- HWMXCore
	DECLARE @HWMXCoreId INT = 1;
	
	IF NOT EXISTS(SELECT 1 FROM dbo.TblProjects WHERE Id = @HWMXCoreId)
		INSERT INTO dbo.TblProjects (Id, [Name])
		VALUES (@HWMXCoreId, 'HWMXCore');

	:r .\HWMXCore\HWMXCore.sql

	-- HWMXPDA
	DECLARE @HWMXPDAId INT = 2;
	
	IF NOT EXISTS(SELECT 1 FROM dbo.TblProjects WHERE Id = @HWMXPDAId)
		INSERT INTO dbo.TblProjects (Id, [Name])
		VALUES (@HWMXPDAId, 'HWMXPDA');

	:r .\HWMXPDA\HWMXPDA.sql

	-- HWMXAngularLibrary
	DECLARE @HWMXAngularLibraryId INT = 3;
	
	IF NOT EXISTS(SELECT 1 FROM dbo.TblProjects WHERE Id = @HWMXAngularLibraryId)
		INSERT INTO dbo.TblProjects (Id, [Name])
		VALUES (@HWMXAngularLibraryId, 'HWMXAngularLibrary');

	--:r .\HWMXAngularLib\HWMXAngularLib.sql
END
GO