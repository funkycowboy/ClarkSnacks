using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Dtos
{
    public class ProcessedLotDto
    {
        public int LotId { get; set; }
        public string LotNumber { get; set; }
        public bool LotManuallyEntered { get; set; }
        public bool? LastCaseOnPalette { get; set; }
        public int ItemId { get; set; }
        public int ProcessedByUserId { get; set; }
    }
}
