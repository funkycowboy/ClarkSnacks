using ClarkSnacks.MTS.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialCategoryController : ControllerBase
    {
        private readonly IMaterialCategoryService _materialCategoryService;

        public MaterialCategoryController(IMaterialCategoryService materialCategoryService)
        {
            _materialCategoryService = materialCategoryService;
        }
        
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            try
            {
                var result = _materialCategoryService.GetAllCategories();

                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet]
        [Route("{categoryId}")]
        public ActionResult<string> GetById([FromRoute] int categoryId)
        {
            try
            {
                var result = _materialCategoryService.GetCategoryById(categoryId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
