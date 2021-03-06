﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClarkSnacks.MTS.API.wwwroot
{
    public class ProcessedLotRequestSvm
    {
        public int LotId { get; set; }
        public string LotNumber { get; set; }
        public bool LotManuallyEntered { get; set; }
        public int ItemId { get; set; }
        public bool LastCaseOnPalette { get; set; }
        public int ProcessedByUserId { get; set; }
    }
}
