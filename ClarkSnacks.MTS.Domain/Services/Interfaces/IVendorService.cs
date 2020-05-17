using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface IVendorService
    {
        List<Vendor> GetAllVendors();
        Vendor GetVendorById(int Id);
        List<Vendor> GetVendorsByCategoryId(int categoryId);
    }
}