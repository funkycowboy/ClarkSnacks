using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string VendorItemId { get; set; }
        public string Description { get; set; }
        public int StatusId { get; set; }

    }
}
