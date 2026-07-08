using AutoMapper;
using HWMX.DotNet.DTOs; 
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class TranslatoryMapper : Profile
    {
        public TranslatoryMapper()
        {
            CreateMap<TblTranslatory, TranslatoryDTO>()
                .ForMember(dto => dto.Id,      src => src.MapFrom(entity => entity.Id))
                .ForMember(dto => dto.English, src => src.MapFrom(entity => entity.English)) 
                .ForMember(dto => dto.Spanish, src => src.MapFrom(entity => entity.Spanish))
                .ForMember(dto => dto.Korean,  src => src.MapFrom(entity => entity.Korean))
                .ReverseMap();
        }
    }
} 