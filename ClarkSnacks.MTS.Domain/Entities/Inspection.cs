using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Inspection
    {
        public Inspection()
        {
            //Lots = new HashSet<Lot>();
        }

        public int Id { get; set; }
        public DateTime DateReceived { get; set; }
        public int VendorId { get; set; }
        public string BOLShipmentNumber { get; set; }
        public bool IsApprovedSupplier { get; set; }
        public int ResultId { get; set; }
        public int DispositionId { get; set; }
        public string DeviationNumber { get; set; }
        public int HoldStatusId { get; set; }
        public string MeasuresToPreventRelease { get; set; }
        public DateTime DateInspected { get; set; }
        public int InspectedById { get; set; }

        // Navigation Properties
        public virtual Operator Operator { get; set; }
        public virtual InspectionQuestion InspectionQuestion { get; set; }
        public virtual Vendor Vendor { get; set; } 
       // public virtual ICollection<Lot> Lots { get; set; }
    }

    public class InspectionQuestion
    {
        public int Id { get; set; }
        public int InspectionId { get; set; }

        public string CartonQuestion1 { get; set; }
        public string CartonQuestion1Comment { get; set; }
        public string CartonQuestion2 { get; set; }
        public string CartonQuestion2Comment { get; set; }
        public string CartonQuestion3 { get; set; }
        public string CartonQuestion3Comment { get; set; }
        public string CartonQuestion4 { get; set; }
        public string CartonQuestion4Comment { get; set; }
        public string CartonQuestion5 { get; set; }
        public string CartonQuestion5Comment { get; set; }
        public string CartonQuestion6 { get; set; }
        public string CartonQuestion6Comment { get; set; }
        public string CartonQuestion7 { get; set; }
        public string CartonQuestion7Comment { get; set; }
        public string CartonQuestion8 { get; set; }
        public string CartonQuestion8Comment { get; set; }

        // Bags
        public string BagQuestion1 { get; set; }
        public string BagQuestion1Comment { get; set; }
        public string BagQuestion2 { get; set; }
        public string BagQuestion2Comment { get; set; }
        public string BagQuestion3 { get; set; }
        public string BagQuestion3Comment { get; set; }
        public string BagQuestion4 { get; set; }
        public string BagQuestion4Comment { get; set; }
        public string BagQuestion5 { get; set; }
        public string BagQuestion5Comment { get; set; }
        public string BagQuestion6 { get; set; }
        public string BagQuestion6Comment { get; set; }
        public string BagQuestion7 { get; set; }
        public string BagQuestion7Comment { get; set; }
        public string BagQuestion8 { get; set; }
        public string BagQuestion8Comment { get; set; }
        public string BagQuestion9 { get; set; }
        public string BagQuestion9Comment { get; set; }
        public string BagQuestion10 { get; set; }
        public string BagQuestion10Comment { get; set; }

        // Contact Film
        public string ContactFilmQuestion1 { get; set; }
        public string ContactFilmQuestion1Comment { get; set; }
        public string ContactFilmQuestion2 { get; set; }
        public string ContactFilmQuestion2Comment { get; set; }
        public string ContactFilmQuestion3 { get; set; }
        public string ContactFilmQuestion3Comment { get; set; }
        public string ContactFilmQuestion4 { get; set; }
        public string ContactFilmQuestion4Comment { get; set; }
        public string ContactFilmQuestion5 { get; set; }
        public string ContactFilmQuestion5Comment { get; set; }
        public string ContactFilmQuestion6 { get; set; }
        public string ContactFilmQuestion6Comment { get; set; }
        public string ContactFilmQuestion7 { get; set; }
        public string ContactFilmQuestion7Comment { get; set; }
        public string ContactFilmQuestion8 { get; set; }
        public string ContactFilmQuestion8Comment { get; set; }
        public string ContactFilmQuestion9 { get; set; }
        public string ContactFilmQuestion9Comment { get; set; }
        public string ContactFilmQuestion10 { get; set; }
        public string ContactFilmQuestion10Comment { get; set; }

        // Overwrap Film
        public string OverwrapFilmQuestion1 { get; set; }
        public string OverwrapFilmQuestion1Comment { get; set; }
        public string OverwrapFilmQuestion2 { get; set; }
        public string OverwrapFilmQuestion2Comment { get; set; }
        public string OverwrapFilmQuestion3 { get; set; }
        public string OverwrapFilmQuestion3Comment { get; set; }
        public string OverwrapFilmQuestion4 { get; set; }
        public string OverwrapFilmQuestion4Comment { get; set; }
        public string OverwrapFilmQuestion5 { get; set; }
        public string OverwrapFilmQuestion5Comment { get; set; }
        public string OverwrapFilmQuestion6 { get; set; }
        public string OverwrapFilmQuestion6Comment { get; set; }
        public string OverwrapFilmQuestion7 { get; set; }
        public string OverwrapFilmQuestion7Comment { get; set; }
        public string OverwrapFilmQuestion8 { get; set; }
        public string OverwrapFilmQuestion8Comment { get; set; }

        public DateTime DateCreated { get; set; }

        // Navigation Properties
        public virtual Inspection Inspection { get; set; }
    }
}
