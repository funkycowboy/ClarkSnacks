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
        public string VendorItemId { get; set; }
        public string DateProcessed { get; set; }
        public int ProcessedByUserId { get; set; }
        public string ProcessedByUserName { get; set; }
    }
}
