using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Vendor
    {
        public Vendor()
        {
            VendorItems = new HashSet<VendorItem>();
            Inspections = new HashSet<Inspection>();
            VendorMaterialCategories = new HashSet<VendorMaterialCategory>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<VendorItem> VendorItems { get; set; }
        public virtual ICollection<Inspection> Inspections { get; set; }
        public virtual ICollection<VendorMaterialCategory> VendorMaterialCategories{ get; set; }
    }
}
