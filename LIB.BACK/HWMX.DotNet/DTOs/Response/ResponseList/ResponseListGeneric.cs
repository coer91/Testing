namespace HWMX.DotNet
{
    public class ResponseList<T> : ResponseListBuilder<T>
    {
        public override List<T> Data { get; set; }
    }
} 