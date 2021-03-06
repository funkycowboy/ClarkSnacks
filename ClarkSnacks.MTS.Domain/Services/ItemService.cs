﻿using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        /// <summary>
        /// Get All Items
        /// </summary>
        /// <returns></returns>
        public List<Item> GetAllItems()
        {
            return _itemRepository.Get().ToList();
        }

        /// <summary>
        /// Get Item by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Item GetItemById(int id)
        {
            return _itemRepository.Get().FirstOrDefault(x => x.Id == id);
        }

        /// <summary>
        /// Get Items by Vendor Id
        /// </summary>
        /// <param name="vendorId"></param>
        /// <returns></returns>
        public List<Item> GetItemsByVendorId(int vendorId)
        {
            return _itemRepository.GetVendorItems()
                .Where(x => x.VendorId == vendorId).Select(x => x.Item).OrderBy(x => x.Description).ToList();
        }

        /// <summary>
        /// Get Items by MaterialCategoryId
        /// </summary>
        /// <param name="materialCategoryId"></param>
        /// <returns></returns>
        public List<Item> GetItemsByMaterialCategoryId(int materialCategoryId)
        {
            return _itemRepository.Get()
                .Where(x => x.MaterialCategoryId == materialCategoryId).ToList();
        }
    }
}
