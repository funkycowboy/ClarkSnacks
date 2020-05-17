using ClarkSnacks.MTS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Repositories.Interfaces
{
    public interface IVendorRepository
    {
        IQueryable<Vendor> Get();
    }
}
