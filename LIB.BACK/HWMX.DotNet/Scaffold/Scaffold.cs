namespace HWMX.DotNet
{
    public sealed class Scaffold : ScaffoldBuilder
    { 
        public Scaffold SetDatabases(IEnumerable<string> databaseList)
        {
            _databaseList = [.. databaseList.Select(x => x.ToPascalCase())];
            return this;
        }


        public Scaffold SetContextPath(string path)
        {
            _contextPath = $"../{path}";
            return this;
        }


        public Scaffold SetDBContextName(string name)
        {
            _contextName = name;
            return this;
        }


        public Scaffold SetRepositoryInterfaceOutput(string path)
        {
            _repositoryInterfaceOutput = $"../{path}";
            return this;
        }


        public Scaffold SetRepositoryOutput(string path)
        {
            _repositoryOutput = $"../{path}";
            return this;
        }


        public Scaffold SetDtoOutput(string path)
        {
            _dtoOutput = $"../{path}";
            return this;
        }


        public Scaffold SetMapperOutput(string path)
        {
            _mapperOutput = $"../{path}";
            return this;
        }


        public Scaffold SetServiceInterfaceOutput(string path)
        {
            _serviceInterfaceOutput = $"../{path}";
            return this;
        }


        public Scaffold SetServiceOutput(string path)
        {
            _serviceOutput = $"../{path}";
            return this;
        }


        public Scaffold SetControllerOutput(string path)
        {
            _controllerOutput = $"../{path}";
            return this;
        }


        public Scaffold SetTestOutput(string path)
        {
            _testOutput = $"../{path}";
            return this;
        }


        public Scaffold SetServiceCollectionPath(string path)
        {
            _serviceCollectionPath = $"../{path}";
            return this;
        }


        public Scaffold SetXunitSetupPath(string path)
        {
            _xunitSetupPath = $"../{path}";
            return this;
        }


        public Scaffold SetConnectionString(string connectionString)
        {
            _efConnectionString = connectionString;
            return this;
        }


        public Scaffold SetEFProvider(string provider)
        {
            _efProvider = provider;
            return this;
        }


        public Scaffold SetEFStartupProject(string startupProject)
        {
            _efStartupProject = startupProject;
            return this;
        }


        public Scaffold SetEFProject(string project)
        {
            _efProject = project;
            return this;
        }


        public Scaffold SetEFNamespace(string efNamespace)
        {
            _efNamespace = efNamespace;
            return this;
        }

        public Scaffold SetEFOutputFiles(string outputFiles)
        {
            _efOutputFiles = outputFiles;
            return this;
        }

        public Scaffold SetEFContextNamespace(string contextNamespace)
        {
            _efContextNamespace = contextNamespace;
            return this;
        }

        public Scaffold SetEFContextOutput(string contextOutput)
        {
            _efContextOutput = contextOutput;
            return this;
        }

        public Scaffold SetEFContextName(string contextName)
        {
            _efContextName = contextName;
            return this;
        }


        public async Task Build()
        {
            string message = StartScaffold();

            if (string.IsNullOrWhiteSpace(message))
                do
                {
                    PrintHeader();
                    SelectDatabase();
                    await SyncDatabase();
                    GetDbSet();
                    CreateAllFiles();
                    CreateIRepository();
                    CreateRepository();
                    CreateDto();
                    CreateMapper();
                    CreateIService();
                    CreateService();
                    CreateController();
                    //CreateTests();
                    SetServiceCollection();

                } while (Confirm("Continue with more models"));

            else
                Console.WriteLine(message);

            Environment.Exit(0);
        }


        private string StartScaffold()
        {
            string message = string.Empty;

            //if (string.IsNullOrWhiteSpace(_database))
            //    message += "\n - The project name has not been set.";

            //if (string.IsNullOrWhiteSpace(_contextPath))
            //    message += "\n - The context path has not been set.";

            //if (string.IsNullOrWhiteSpace(_contextName))
            //    _contextName = $"{_database}Context";

            return message;
        }
    }
}