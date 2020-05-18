using ClarkSnacks.MTS.Domain.Entities;
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
        /// Get Items Vendor Id
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public List<Item> GetItemsByVendorId(int categoryId)
        {
            return _itemRepository.Get().ToList();
        }
    }
}
