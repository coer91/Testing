namespace HWMX.DotNet
{
    public class ResponseDTO<T> : ResponseDTOBuilder<T>
    {
        public override T Data { get; set; }
    }
} 