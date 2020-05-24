using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class MaterialCategory
    {

        public MaterialCategory(){
            Items = new HashSet<Item>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int StatusId { get; set; }

        public virtual ICollection<Item> Items { get; set; }
    }
}
