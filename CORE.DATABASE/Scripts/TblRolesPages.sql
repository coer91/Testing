BEGIN	  
	DECLARE @RoleId INT = (SELECT Id FROM dbo.TblRoles WHERE [Name] = 'Developer');  

	INSERT INTO dbo.TblRolesPages(RoleId, PageId, CanCreate, CanUpdate, CanDelete)
	SELECT @RoleId, pages.Id, 1, 1, 1
	FROM dbo.TblProjectsPages   pages WITH(NOLOCK)
	LEFT JOIN dbo.TblRolesPages RP    WITH(NOLOCK) ON RP.PageId = pages.Id AND RP.RoleId = @RoleId
	WHERE RP.Id IS NULL;
END
GO 