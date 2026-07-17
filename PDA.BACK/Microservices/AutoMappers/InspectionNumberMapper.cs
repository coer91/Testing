using AutoMapper;
using Microservices.DTOs;

namespace Microservices.AutoMappers
{
    public class InspectionNumberMapper : Profile
    {
        public InspectionNumberMapper()
        {
            //CreateMap<dynamic, LotInformationDTO>()
            //    .ForMember(dto => dto.InspectionNumber, src => src.MapFrom(x => x.INSP_NO))
            //    .ForMember(dto => dto.StorageCode,      src => src.MapFrom(x => x.STORAGE_CODE))
            //    .ForMember(dto => dto.InspectionDate,   src => src.MapFrom(x => x.INSP_DATE))
            //    .ForMember(dto => dto.IsApplied,        src => src.MapFrom(x => x.APPLY_FLAG == "Y"))
            //    .ForMember(dto => dto.User,             src => src.MapFrom(x => x.INPUTUSER))
            //    .ReverseMap();
        }
    }
} 