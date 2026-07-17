using AutoMapper;
using HWMX.DotNet;
using Microservices.DTOs;
using Repositories.Database;

namespace Microservices.AutoMappers
{
    public class LotInformationMapper : Profile
    {
        public LotInformationMapper() 
        {
            CreateMap<LOT_INFORMATION, LotInformationDTO>()
                .ForMember(dto => dto.LotNumber     , src => src.MapFrom(entity => entity.LOT_NUMBER))
                .ForMember(dto => dto.PartNumber    , src => src.MapFrom(entity => entity.PART_NUMBER))
                .ForMember(dto => dto.PartName      , src => src.MapFrom(entity => entity.PART_NAME))
                .ForMember(dto => dto.EoNumber      , src => src.MapFrom(entity => entity.EO_NUMBER))
                .ForMember(dto => dto.Qty           , src => src.MapFrom(entity => int.Parse(entity.QTY)))
                .ForMember(dto => dto.Unit          , src => src.MapFrom(entity => entity.UNIT))
                .ForMember(dto => dto.StorageCode   , src => src.MapFrom(entity => entity.STORAGE_CODE))
                .ForMember(dto => dto.Storage       , src => src.MapFrom(entity => entity.STORAGE))
                .ForMember(dto => dto.Location      , src => src.MapFrom(entity => entity.LOCATION))
                .ForMember(dto => dto.CaseLabelId   , src => src.MapFrom(entity => entity.CASE_LABEL_ID))
                .ForMember(dto => dto.VendorCode    , src => src.MapFrom(entity => entity.VENDOR_CODE))
                .ForMember(dto => dto.Vendor        , src => src.MapFrom(entity => entity.VENDOR))
                .ForMember(dto => dto.InputDate     , src => src.MapFrom(entity => entity.INPUT_DATE != null ? Dates.ToDateTime($"{entity.INPUT_DATE}", "yyyyMMdd").ToFormatMDY() : string.Empty))
                .ForMember(dto => dto.ProductionDate, src => src.MapFrom(entity => entity.PRODUCTION_DATE != null ? Dates.ToDateTime($"{entity.PRODUCTION_DATE}", "yyyyMMddHHmmss").ToFormatMDY() : string.Empty))
                .ForMember(dto => dto.HasDefect     , src => src.MapFrom(entity => entity.HAS_DEFECT == "Y"))
                .ForMember(dto => dto.HasInspection , src => src.MapFrom(entity => entity.HAS_INSPECTION == "Y"))
                .ForMember(dto => dto.HasEO         , src => src.MapFrom(entity => entity.HAS_EO == "Y"))
                .ForMember(dto => dto.IsDeleted     , src => src.MapFrom(entity => entity.IS_DELETED == "Y"))
                .ReverseMap();
        }
    }
} 