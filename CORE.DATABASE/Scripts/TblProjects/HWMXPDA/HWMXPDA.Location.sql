--
SET @Page      = 'Material Move';
SET @Path      = '/location/MM_LM0101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0101';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1);

--
SET @Page      = 'Material Move(New)';
SET @Path      = '/location/MM_LM0102';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0102';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 2);

--
SET @Page      = 'Material Move(FIFO)';
SET @Path      = '/location/MM_LM0103';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0103';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 3);

--
SET @Page      = 'Location Selector';
SET @Path      = '/location/MM_LM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0201';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 4);

--
SET @Page      = 'INGOT Location';
SET @Path      = '/location/MM_LM0203';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0203';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 5);

--
SET @Page      = 'Make up Trolly';
SET @Path      = '/location/MM_LM0401';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0401';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 6);

--
SET @Page      = 'Pallet Move';
SET @Path      = '/location/MM_LM0501';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0501';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 7);

--
SET @Page      = 'Engine StockTaking';
SET @Path      = '/location/MM_LM0601';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0601';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 8);

--
SET @Page      = '3C Stocktaking';
SET @Path      = '/location/MM_LM0701';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0701';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 9);

--
SET @Page      = 'Stocktaking Lineside';
SET @Path      = '/location/MM_LM0801';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0801';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 10);

--
SET @Page      = 'Pallet Location';
SET @Path      = '/location/MM_LM0901';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0901';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 11);

--
SET @Page      = 'Diecasting Stocktaking';
SET @Path      = '/location/MM_LM1001';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1001';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 12);

--
SET @Page      = 'Case Pallet Verification';
SET @Path      = '/location/MM_LM1011';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1011';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 13);

--
SET @Page      = 'Engine Wip Stocktaking';
SET @Path      = '/location/MM_LM1101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1101';
IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE [Name]  = @Page
		AND ProjectId = @HWMXPDAId 
		AND ModuleId  = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages ([Name], [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, [Sequence])
VALUES (@Page, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 14);