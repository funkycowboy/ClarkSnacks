using AutoMapper;
using ClarkSnacks.MTS.API.Models;
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
                .ForMember(dst => dst.MaterialCategoryName, opt => opt.MapFrom(src => src.Item.MaterialCategory.Name))
                .ForMember(dst => dst.VendorName, opt => opt.MapFrom(src => src.Inspection.Vendor.Name))
                .ForMember(dst => dst.DateReceived, opt => opt.MapFrom(src => src.Inspection.DateReceived));

            CreateMap<LotsRequestSvm, Lot>();

            CreateMap<ProcessedLotRequestSvm, ProcessedLot>();

            CreateMap<ProcessedLot, ProcessedLotResponseSvm>()
                .ForMember(dst => dst.ItemDescription, opt => opt.MapFrom(src => src.Lot.Item.Description))
                .ForMember(dst => dst.MaterialCategoryName, opt => opt.MapFrom(src => src.Lot.Item.MaterialCategory.Name))
                .ForMember(dst => dst.LotNumber, opt => opt.MapFrom(src => src.Lot.LotNumber))
                .ForMember(dst => dst.DateProcessed, opt => opt.MapFrom(src => src.DateProcessed.ToString("MMMM dd, h:mm tt")))
                .ForMember(dst => dst.ProcessedByUserName, opt => opt.MapFrom(src => src.Lot.Operator.EmployeeName))
                .ForMember(dst => dst.VendorItemId, opt => opt.MapFrom(src => src.Lot.Item.VendorItemId));

            CreateMap<ProcessedLotRequestSvm, ProcessedLotDto>();

            CreateMap<Operator, OperatorResponseSvm>();

            CreateMap<InspectionRequestSvm, Inspection>()
                .ForMember(dst => dst.InspectionQuestion, opt => opt.MapFrom(src => src.Questions));

            CreateMap<InspectionLotRequestSvm, Lot>()
                 .ForMember(dst => dst.Id, opt => opt.Ignore());


            CreateMap<InspectionQuestionRequestSvm, InspectionQuestion>();
        }
    }
}
