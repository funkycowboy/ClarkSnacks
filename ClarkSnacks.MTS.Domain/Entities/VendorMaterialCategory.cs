using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class VendorMaterialCategory
    {

        public VendorMaterialCategory(){
        }

        public int Id { get; set; }
        public int VendorId { get; set; }
        public int MaterialCategoryId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreatedAtDate { get; set; }

        public virtual Vendor Vendor { get; set; }
        public virtual MaterialCategory MaterialCategory { get; set; }
    }
}
