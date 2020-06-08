using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClarkSnacks.MTS.API.wwwroot
{
    public class ProcessedLotResponseSvm
    {
        public int Id { get; set; }
        public string LotNumber { get; set; }
        public string ItemDescription { get; set; }
        public string MaterialCategoryName { get; set; }
        public DateTime DateProcessed { get; set; }
    }
}
