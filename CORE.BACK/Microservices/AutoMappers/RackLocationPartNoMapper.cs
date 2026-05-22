using AutoMapper;
using Microservices.DTOs;
using Repositories.HWMENMES.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microservices.AutoMappers
{
    public class RackLocationPartNoMapper : Profile
    {
        public RackLocationPartNoMapper()
        {
            CreateMap<MES_RACK_LOC_PART_MA,RackLocationPartNoDTO>()
                .ForMember(dto => dto.LocationNumber, src => src.MapFrom(entity => entity.LOC_NO))
                .ForMember(dto => dto.PartNumber, src => src.MapFrom(entity => entity.PART_NO))
                .ForMember(dto => dto.MaxQty, src => src.MapFrom(entity => entity.MAX_QTY != null ? (int)entity.MAX_QTY : 0))
                .ForMember(dto => dto.InputDate, src => src.MapFrom(entity => entity.INPUTDATE))
                .ForMember(dto => dto.InputUser, src => src.MapFrom(entity => entity.INPUTUSER))
                .ForMember(dto => dto.UpdateDate, src => src.MapFrom(entity => entity.UPDATEDATE))
                .ForMember(dto => dto.UpdateUser, src => src.MapFrom(entity => entity.UPDATEUSER))
                .ReverseMap();
        }
    }
}
