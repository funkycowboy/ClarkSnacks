using AutoMapper;
using ClarkSnacks.MTS.API.wwwroot;
using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotController : ControllerBase
    {
        private readonly ILotService _lotService;
        private readonly IMapper _mapper;

        public LotController(ILotService lotService, IMapper mapper)
        {
            _lotService = lotService;
            _mapper = mapper;
        }
        
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            try
            {
                var result = _lotService.GetAllLots();

                var svm = _mapper.Map<List<Lot>, List<LotsResponseSvm>>(result);

                return Ok(svm);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Route("{lotId}")]
        public ActionResult<string> GetById([FromRoute] int lotId)
        {
            try
            {
                var result = _lotService.GetLotById(lotId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Route("ProcessedLots")]
        public ActionResult<string> GetProcessedLots()
        {
            try
            {
                var result = _lotService.GetProcessedLots();

                var svm = _mapper.Map<List<ProcessedLot>, List<ProcessedLotResponseSvm>>(result);

                return Ok(svm);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]       
        public ActionResult<string> Create([FromBody] LotsRequestSvm request)
        {
            try
            {
                var lot = _mapper.Map<LotsRequestSvm, Lot>(request);
                var result = _lotService.CreateLot(lot);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        [Route("ProcessLot")]
        public ActionResult<string> Create([FromBody] ProcessedLotRequestSvm request)
        {
            try
            {
                var processedLot = _mapper.Map<ProcessedLotRequestSvm, ProcessedLot>(request);
                var result = _lotService.CreateProcessedLot(processedLot);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete]
        [Route("ProcessedLot/{processedLotId}")]
        public ActionResult<string> DeleteProcessedLot([FromRoute] int processedLotId)
        {
            try
            {
                _lotService.DeleteProcessedLot(processedLotId);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
