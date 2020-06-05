using ClarkSnacks.MTS.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ClarkSnacks.MTS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }
        
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            try
            {
                var result = _itemService.GetAllItems();

                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet]
        [Route("{itemId}")]
        public ActionResult<string> GetById([FromRoute] int itemId)
        {
            try
            {
                var result = _itemService.GetItemById(itemId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Route("vendors/{vendorId}")]
        public ActionResult<string> GetByVendorId([FromRoute] int vendorId)
        {
            try
            {
                var result = _itemService.GetItemsByVendorId(vendorId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        [Route("material-category/{materialCategoryId}")]
        public ActionResult<string> GetByMaterialCategoryIdId([FromRoute] int materialCategoryId)
        {
            try
            {
                var result = _itemService.GetItemsByMaterialCategoryId(materialCategoryId);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}
