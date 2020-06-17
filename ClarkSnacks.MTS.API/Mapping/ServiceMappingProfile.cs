using AutoMapper;
using ClarkSnacks.MTS.API.wwwroot;
using ClarkSnacks.MTS.Domain.Dtos;
using ClarkSnacks.MTS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClarkSnacks.MTS.API.Mapping
{
    public class ServiceMappingProfile : Profile
    {
        public ServiceMappingProfile() : base("ServiceMappingProfile")
        {
            CreateMap<Lot, LotsResponseSvm>()
                .ForMember(dst => dst.ItemDescription, opt => opt.MapFrom(src => src.Item.Description))
                .ForMember(dst => dst.VendorName, opt => opt.MapFrom(src => src.Vendor.Name))
                .ForMember(dst => dst.MaterialCategoryName, opt => opt.MapFrom(src => src.Item.MaterialCategory.Name));

            CreateMap<LotsRequestSvm, Lot>();

            CreateMap<ProcessedLotRequestSvm, ProcessedLot>();

            CreateMap<ProcessedLot, ProcessedLotResponseSvm>()
                .ForMember(dst => dst.ItemDescription, opt => opt.MapFrom(src => src.Lot.Item.Description))
                .ForMember(dst => dst.MaterialCategoryName, opt => opt.MapFrom(src => src.Lot.Item.MaterialCategory.Name))
                .ForMember(dst => dst.LotNumber, opt => opt.MapFrom(src => src.Lot.LotNumber))
                .ForMember(dst => dst.DateProcessed, opt => opt.MapFrom(src => src.DateProcessed.ToString("MMMM dd, h:mm tt")));

            CreateMap<ProcessedLotRequestSvm, ProcessedLotDto>();

            CreateMap<Operator, OperatorResponseSvm>();
        }
    }
}
