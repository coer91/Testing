BEGIN	  
	DECLARE @Role VARCHAR(80) = 'Developer';  
	IF NOT EXISTS(SELECT 1 FROM dbo.TblRoles WHERE [Name] = @Role)
		INSERT INTO dbo.TblRoles ([Name], IsActive, About)
		VALUES (@Role, 1, 'This role is only for software developers');  
END
GO