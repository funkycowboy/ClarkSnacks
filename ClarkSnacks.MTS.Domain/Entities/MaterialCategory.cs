using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class MaterialCategory
    {

        public MaterialCategory(){
            Items = new HashSet<Item>();
            VendorMaterialCategories = new HashSet<VendorMaterialCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<Item> Items { get; set; }
        public virtual ICollection<VendorMaterialCategory> VendorMaterialCategories { get; set; }
    }
}
