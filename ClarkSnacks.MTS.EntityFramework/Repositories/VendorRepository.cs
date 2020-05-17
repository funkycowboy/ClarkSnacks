using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class VendorRepository : IVendorRepository
    {
        private readonly MTSDbContext _context;

        public VendorRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Vendors
        /// </summary>
        /// <returns></returns>
        public IQueryable<Vendor> Get()
        {
           return _context.Vendors;
        }
    }
}
