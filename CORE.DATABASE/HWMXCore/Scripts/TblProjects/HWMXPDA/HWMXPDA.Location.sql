SET @Page      = 'Transferencia de Material';
SET @Path      = '/location/MM_LM0102';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0102'; 

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Transferencia de Material FIFO';
SET @Path      = '/location/MM_LM0103';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0103';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Indicate location';
SET @Path      = '/location/MM_LM0201';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0201';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'Indicar ubicación', N'표시하다');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'INGOT Location';
SET @Path      = '/location/MM_LM0203';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0203';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Configuracion de Trolly';
SET @Path      = '/location/MM_LM0401';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0401';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Pallet Move';
SET @Path      = '/location/MM_LM0501';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0501';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Inventario del motor';
SET @Path      = '/location/MM_LM0601';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0601';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = '3C Stocktaking';
SET @Path      = '/location/MM_LM0701';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0701';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Stocktaking Lineside';
SET @Path      = '/location/MM_LM0801';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0801';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Pallet Location';
SET @Path      = '/location/MM_LM0901';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM0901';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Diecasting Stocktaking';
SET @Path      = '/location/MM_LM1001';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1001';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Case Pallet Verification';
SET @Path      = '/location/MM_LM1011';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1011';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------

SET @Page      = 'Engine Wip Stocktaking';
SET @Path      = '/location/MM_LM1101';
SET @Icon      = NULL;
SET @ActiveKey = 'MM_LM1101';

IF NOT EXISTS (SELECT 1 FROM dbo.TblTranslatory WHERE English = @Page)
	INSERT INTO dbo.TblTranslatory (English, Spanish, Korean)
	VALUES (@Page, N'', N'');
SET @TranslatoryId = (SELECT Id FROM dbo.TblTranslatory WHERE English = @Page);

IF NOT EXISTS(
	SELECT 1 FROM TblProjectsPages 
		WHERE TranslatoryId = @TranslatoryId
		AND ProjectId       = @HWMXPDAId 
		AND ModuleId        = @ModuleId
		AND SubmoduleId IS NULL
)	
INSERT INTO TblProjectsPages (TranslatoryId, [Path], Icon, ProjectId, ModuleId, SubmoduleId, IsActive, ActiveKey, ShowIndex, [Sequence])
VALUES (@TranslatoryId, @Path, @Icon, @HWMXPDAId, @ModuleId, @SubmoduleId, @IsActive, @ActiveKey, 1, @Secuence);

--------------------------------------------------------------------------------------------------------------------------
