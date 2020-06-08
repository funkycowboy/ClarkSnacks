using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClarkSnacks.MTS.API.wwwroot
{
    public class LotsResponseSvm
    {
        public int Id { get; set; }
        public string LotNumber { get; set; }
        public int Quantity { get; set; }
        public int ItemId { get; set; }
        public string ItemDescription { get; set; }
        public DateTime DateReceived { get; set; }
        public string BOLShipmentNumber { get; set; }
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public string MaterialCategoryName { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
