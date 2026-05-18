
using AutoMapper;
using Microservices.DTOs;
using Repositories.HWMENMES.Database;

namespace Microservices.AutoMappers
{
    public class RackLocationMapper : Profile
    {
        public RackLocationMapper()
        {
            CreateMap<MES_RACK_LOC_MA, RackLocationDTO>()
                .ForMember(dto => dto.LocationNumber, src => src.MapFrom(x => x.LOC_NO))
                .ForMember(dto => dto.RackType1, src => src.MapFrom(x => x.RACK_TYPE1))
                .ForMember(dto => dto.RackType2, src => src.MapFrom(x => x.RACK_TYPE2))
                .ForMember(dto => dto.RackNumber, src => src.MapFrom(x => x.RACK_NO))
                .ForMember(dto => dto.Row, src => src.MapFrom(x => x.ROW_NO != null ? x.ROW_NO  : 0))
                .ForMember(dto => dto.Column, src => src.MapFrom(x => x.COL_NO != null ? x.COL_NO : 0))
                .ForMember(dto => dto.MaxWeight, src => src.MapFrom(x => x.MAX_WEIGHT != null ? x.MAX_WEIGHT : 0))
                .ForMember(dto => dto.Channel, src => src.MapFrom(x => x.CHANNEL))
                .ForMember(dto => dto.Device, src => src.MapFrom(x => x.DEVICE))
                .ForMember(dto => dto.AddrCall, src => src.MapFrom(x => x.ADDR_CALL))
                .ForMember(dto => dto.AddrEmpty, src => src.MapFrom(x => x.ADDR_EMPTY))
                .ForMember(dto => dto.RowType, src => src.MapFrom(x => x.RW_TYPE))
                .ForMember(dto => dto.RowDataType, src => src.MapFrom(x => x.RW_DATA_TYPE))
                .ForMember(dto => dto.PlcType, src => src.MapFrom(x => x.PLC_TYPE))
                .ForMember(dto => dto.BitPos, src => src.MapFrom(x => x.BIT_POS != null ? int.Parse(x.BIT_POS) : 0))
                .ForMember(dto => dto.Date, src => src.MapFrom(x => x.INPUTDATE))
                .ReverseMap();            
        }
    }
}