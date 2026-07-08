BEGIN	  
	DECLARE @Role VARCHAR(80) = 'Developer';  
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is only for software developers');  

	SET @Role = 'CVJ [PDA] Manager';
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is for Manager of CVJ [PDA]'); 
		
	SET @Role = 'CVJ [PDA] Staff';
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is for Staff of CVJ [PDA]'); 

	SET @Role = 'CVJ [PDA] Supervisor';
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is for Supervisor of CVJ [PDA]'); 

	SET @Role = 'CVJ [PDA] Operator';
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is for Operator of CVJ [PDA]'); 
END
GO