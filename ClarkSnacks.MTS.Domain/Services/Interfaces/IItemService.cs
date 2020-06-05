using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface IItemService
    {
        List<Item> GetAllItems();
        Item GetItemById(int Id);
        List<Item> GetItemsByVendorId(int categoryId);
        List<Item> GetItemsByMaterialCategoryId(int materialCategoryId);
    }
}