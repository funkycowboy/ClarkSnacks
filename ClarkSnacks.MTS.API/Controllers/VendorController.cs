using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClarkSnacks.MTS.Domain.Services.Interfaces;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }
        
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            try
            {
                var result = _vendorService.GetAllVendors();

                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet]
        [Route("{vendorId}")]
        public ActionResult<string> GetById([FromRoute] int vendorId)
        {
            try
            {
                var result = _vendorService.GetVendorById(vendorId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Route("categories/{categoryId}")]
        public ActionResult<string> GetByCategoryId([FromRoute] int categoryId)
        {
            try
            {
                var result = _vendorService.GetVendorsByCategoryId(categoryId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
