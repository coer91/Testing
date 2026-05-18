BEGIN	  
	IF NOT EXISTS(SELECT 1 FROM dbo.TblLanguages WHERE Id = 'en_US')
		INSERT INTO dbo.TblLanguages (Id, [Name])
		VALUES ('en_US', 'English'); 

	IF NOT EXISTS(SELECT 1 FROM dbo.TblLanguages WHERE Id = 'es_MX')
		INSERT INTO dbo.TblLanguages (Id, [Name])
		VALUES ('es_MX', 'Español');
		
	IF NOT EXISTS(SELECT 1 FROM dbo.TblLanguages WHERE Id = 'ko-KR')
		INSERT INTO dbo.TblLanguages (Id, [Name])
		VALUES ('ko-KR', '한국어');
END
GO