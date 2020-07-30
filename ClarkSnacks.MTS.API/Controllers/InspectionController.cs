using AutoMapper;
using ClarkSnacks.MTS.API.Models;
using ClarkSnacks.MTS.API.wwwroot;
using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectionController : ControllerBase
    {
        private readonly IInspectionService _inspectionService;
        private readonly IMapper _mapper;

        public InspectionController(IInspectionService inspectionService, IMapper mapper)
        {
            _inspectionService = inspectionService;
            _mapper = mapper;
        }

        [HttpPost]
        public ActionResult<string> Create([FromBody] InspectionRequestSvm request)
        {
            try
            {
                var inspection = _mapper.Map<InspectionRequestSvm, Inspection>(request);
                var result = _inspectionService.CreateInspection(inspection);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
