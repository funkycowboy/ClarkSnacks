using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class ProcessedLot
    {
        public int Id { get; set; }
        public int LotId { get; set; }
        public int ProcessedByUserId { get; set; }
        public DateTime DateProcessed { get; set; }

        public virtual Lot Lot { get; set; }
    }
}
