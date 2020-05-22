using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class VendorItem
    {
        public int Id { get; set; }
        public int VendorId { get; set; }
        public int ItemId { get; set; }
        public int StatusId { get; set; }

        public virtual Vendor Vendor { get; set; }
        public virtual Item Item { get; set; }
    }
}
