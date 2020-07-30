using System;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Lot
    {
        public int Id { get; set; }
        public int InspectionId { get; set; }
        public string LotNumber { get; set; }
        public int? Quantity { get; set; }
        public int ItemId { get; set; }
        public int? StatusId { get; set; }
        public bool? ManuallyEntered { get; set; }
        public DateTime DateCreated { get; set; }
        public int CreatedByUserId { get; set; }

        public virtual Item Item { get; set; }
        public virtual Operator Operator { get; set; }
        //public virtual Inspection Inspection { get; set; }
    }
}
