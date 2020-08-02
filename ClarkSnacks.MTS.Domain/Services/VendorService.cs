using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;

        public VendorService(IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        /// <summary>
        /// Get All Vendors
        /// </summary>
        /// <returns></returns>
        public List<Vendor> GetAllVendors()
        {
            return _vendorRepository.Get().ToList();
        }

        /// <summary>
        /// Get Vendor by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Vendor GetVendorById(int id)
        {
            return _vendorRepository.Get().FirstOrDefault(x => x.Id == id);
        }

        /// <summary>
        /// Get Vendors by Material Category Id (i.e. cartom, bag, film, etc..
        /// </summary>
        /// <param name="categoryId"></param>
        /// <returns></returns>
        public List<Vendor> GetVendorsByCategoryId(int categoryId)
        {
            //return _vendorRepository.Get().Select(x => x.VendorItems.FirstOrDefault(y => y.Item.MaterialCategoryId == categoryId).Vendor).ToList();
            return _vendorRepository.Get().Select(x => x.VendorMaterialCategories.FirstOrDefault(y => y.MaterialCategoryId == categoryId).Vendor).ToList();
        }
    }
}
