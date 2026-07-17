using AutoMapper;
using Microservices.DTOs;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class StorageMapper : Profile
    {
        public StorageMapper()
        {
            CreateMap<STORAGE, StorageDTO>()
                .ForMember(dto => dto.Code   , src => src.MapFrom(entity => entity.STORAGE_CODE))
                .ForMember(dto => dto.Name   , src => src.MapFrom(entity => entity.STORAGE_NAME))
                .ForMember(dto => dto.Factory, src => src.MapFrom(entity => entity.FACTORY))
                .ForMember(dto => dto.Type   , src => src.MapFrom(entity => entity.STORAGE_TYPE)) 
                .ReverseMap();
        }
    }
} 