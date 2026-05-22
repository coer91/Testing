using AutoMapper;
using Microservices.DTOs;
using Repositories.HWMENMES.Database; 

namespace Microservices.AutoMappers
{
    public class StorageMapper : Profile
    {
        public StorageMapper()
        {
            CreateMap<MES_STORAGE_MA, StorageDTO>()
                .ForMember(dto => dto.Code,     src => src.MapFrom(x => x.STORAGE_CODE))
                .ForMember(dto => dto.Name,     src => src.MapFrom(x => x.STORAGE_NAME_EN))
                .ForMember(dto => dto.ERPWerks, src => src.MapFrom(x => x.ERP_WERKS))
                .ForMember(dto => dto.ERPCode,  src => src.MapFrom(x => x.ERP_CODE))
                .ForMember(dto => dto.Type,     src => src.MapFrom(x => x.STORAGE_TYPE))
                .ForMember(dto => dto.Factory,  src => src.MapFrom(x => x.FACTORY))
                .ForMember(dto => dto.Sequence, src => src.MapFrom(x => x.ORDER_SEQ != null ? int.Parse(x.ORDER_SEQ) : 0))
                .ForMember(dto => dto.IsActive, src => src.MapFrom(x => x.USE_FLAG == "Y"));
        }
    }
} 