SELECT TOP (1000) [Id]
      ,[Name]
      ,[Email]
      ,[Password]
      ,[Status]
  FROM [AutoFlow].[dbo].[Login]

  DELETE FROM [AutoFlow].[dbo].[Login]
WHERE [Id] <> 1; 
--this deletes everything execpt 1 table