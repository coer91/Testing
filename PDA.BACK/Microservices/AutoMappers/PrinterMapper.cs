using AutoMapper;
using HWMX.DotNet;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class PrinterMapper : Profile
    {
        public PrinterMapper()
        {
            CreateMap<PRINTER, OptionDTO>()
                .ForMember(dto => dto.Id      , src => src.MapFrom(entity => 0))
                .ForMember(dto => dto.Name    , src => src.MapFrom(entity => entity.PRINTER_NAME))
                .ForMember(dto => dto.About   , src => src.MapFrom(entity => entity.IP_ADDRESS))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(entity => true))
                .ReverseMap();
        }
    }
}