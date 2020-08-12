using AutoMapper;
using ClarkSnacks.MTS.API.wwwroot;
using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StructureMap;
using System;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperatorController : ControllerBase
    {
        private readonly IOperatorService _operatorService;
        private readonly IMapper _mapper;

        public OperatorController(IOperatorService operatorService, IMapper mapper)
        {
            _operatorService = operatorService;
            _mapper = mapper;
        }
        
        [HttpGet]
        [Authorize()]
        public ActionResult<string> GetAll()
        {
            try
            {
                var result = _operatorService.GetAll();

                var svm = _mapper.Map<List<Operator>, List<OperatorResponseSvm>>(result);

                return Ok(svm);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }
    }
}
