using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClarkSnacks.MTS.API.wwwroot
{
    public class LotsRequestSvm
    {
        public string LotNumber { get; set; }
        public int ItemId { get; set; }
        public int CreatedByUserId { get; set; }
    }
}
