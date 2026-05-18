BEGIN	  
	IF NOT EXISTS(SELECT 1 FROM dbo.TblPartners WHERE [Name] = 'WIA')
		INSERT INTO dbo.TblPartners ([Name], IsActive)
		VALUES ('WIA', 1); 

	IF NOT EXISTS(SELECT 1 FROM dbo.TblPartners WHERE [Name] = 'Autoever')
		INSERT INTO dbo.TblPartners ([Name], IsActive)
		VALUES ('Autoever', 1); 
END
GO