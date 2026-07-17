using AutoMapper;
using Microservices.DTOs;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class RackLocationMapper : Profile
    {
        public RackLocationMapper()
        {
            CreateMap<RACK_LOCATION, RackLocationDTO>()
                .ForMember(dto => dto.Location, src => src.MapFrom(entity => entity.LOCATION))
                .ForMember(dto => dto.Rack    , src => src.MapFrom(entity => entity.RACK))
                .ForMember(dto => dto.RackType, src => src.MapFrom(entity => entity.RACK_TYPE))
                .ForMember(dto => dto.Row     , src => src.MapFrom(entity => int.Parse(entity.ROW)))
                .ForMember(dto => dto.Column  , src => src.MapFrom(entity => int.Parse(entity.COLUMN)))
                .ReverseMap(); 
        }
    }
}   