using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly MTSDbContext _context;

        public ItemRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Vendor Items
        /// </summary>
        /// <returns></returns>
        public IQueryable<VendorItem> GetVendorItems()
        {
            return _context.VendorItems
                 .Include(x => x.Item)
                 .Include(x => x.Vendor);
        }

        /// <summary>
        /// Get Items
        /// </summary>
        /// <returns></returns>
        public IQueryable<Item> Get()
        {
            return _context.Items;
        }
    }
}
