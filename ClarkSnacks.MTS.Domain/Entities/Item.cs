using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Item
    {
        public Item(){
            Lots = new HashSet<Lot>();
        }

        public int Id { get; set; }
        public string VendorItemId { get; set; }
        public string Description { get; set; }
        public int MaterialCategoryId { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<VendorItem> VendorItems { get; set; }
        public virtual MaterialCategory MaterialCategory{ get; set; }
        public virtual ICollection<Lot> Lots { get; set; }
    }
}
