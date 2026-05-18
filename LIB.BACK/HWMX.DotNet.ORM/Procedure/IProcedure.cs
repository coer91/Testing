using Oracle.ManagedDataAccess.Client;
using System.Data;

namespace HWMX.DotNet.ORM
{
    public interface IProcedure
    {
        public IProcedure SetPackage(string packageName);
        public IProcedure SetProcedure(string procedureName);
        public IProcedure AddInput(string parameterName, OracleDbType type, object value = null);
        public IProcedure AddInput(string parameterName, SqlDbType type, object value = null);
        public IProcedure AddInput(string parameterName, string udtTypeName, IEnumerable<string> list);
        public IProcedure AddOutput(string parameterName, SqlDbType type);
        public IProcedure AddOutput(string parameterName, OracleDbType type);
        public Task<ResponseProcedure> ExecAsync(int timeout = 30);
    }
} 