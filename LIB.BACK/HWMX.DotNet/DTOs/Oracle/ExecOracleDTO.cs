namespace HWMX.DotNet
{
    public class ExecOracleDTO
    { 
        public string Procedure { get; set; }
        public List<ExecOracleInputDTO> Inputs { get; set; } = [];
        public List<ExecOracleOutputDTO> Outputs { get; set; } = [];
    }
}