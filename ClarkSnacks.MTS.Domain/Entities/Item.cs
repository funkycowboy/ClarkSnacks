using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Item
    {
        public Item(){
            VendorItems = new HashSet<VendorItem>();
            Lots = new HashSet<Lot>();
            InspectionItems = new HashSet<InspectionItem>();
        }

        public int Id { get; set; }
        public string VendorItemId { get; set; }
        public string Description { get; set; }
        public int MaterialCategoryId { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<VendorItem> VendorItems { get; set; }
        public virtual MaterialCategory MaterialCategory{ get; set; }
        public virtual ICollection<Lot> Lots { get; set; }
        public virtual ICollection<InspectionItem> InspectionItems { get; set; }
    }
}
