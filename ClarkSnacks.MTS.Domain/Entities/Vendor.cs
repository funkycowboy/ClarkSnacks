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
            Lots = new HashSet<Lot>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<VendorItem> VendorItems { get; set; }
        public virtual ICollection<Lot> Lots { get; set; }
    }
}
