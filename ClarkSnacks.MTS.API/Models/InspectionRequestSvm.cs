using System.Collections.Generic;

namespace ClarkSnacks.MTS.API.Models
{
    public class InspectionRequestSvm
    {
        public List<InspectionItem> items;
        public int Supplier { get; set; }
        public string DateReceived  { get; set; }
        public string BolShipmentNumber { get; set; }
        public bool IsApprovedSupplier { get; set; }
        public InspectionQuestions Questions  { get; set; }
        public string Result  { get; set; }
        public string Disposition  { get; set; }
        public string DeviationNumber { get; set; }
        public string HoldStatus { get; set; }
        public string MeasuresToPreventRelease  { get; set; }
    }

    public class InspectionQuestions
    {
      public string cartonQuestion1 { get; set; }
      public string cartonQuestion1Comment { get; set; }
      public string cartonQuestion2 { get; set; }
      public string cartonQuestion2Comment { get; set; }
      public string cartonQuestion3 { get; set; }
      public string cartonQuestion3Comment { get; set; }
      public string cartonQuestion4 { get; set; }
      public string cartonQuestion4Comment { get; set; }
      public string cartonQuestion5 { get; set; }
      public string cartonQuestion5Comment { get; set; }
      public string cartonQuestion6 { get; set; }
      public string cartonQuestion6Comment { get; set; }
      public string cartonQuestion7 { get; set; }
      public string cartonQuestion7Comment { get; set; }
      public string cartonQuestion8 { get; set; }
      public string cartonQuestion8Comment { get; set; }

      // Bags
      public string bagQuestion1 { get; set; }
      public string bagQuestion1Comment { get; set; }
      public string bagQuestion2 { get; set; }
      public string bagQuestion2Comment { get; set; }
      public string bagQuestion3 { get; set; }
      public string bagQuestion3Comment { get; set; }
      public string bagQuestion4 { get; set; }
      public string bagQuestion4Comment { get; set; }
      public string bagQuestion5 { get; set; }
      public string bagQuestion5Comment { get; set; }
      public string bagQuestion6 { get; set; }
      public string bagQuestion6Comment { get; set; }
      public string bagQuestion7 { get; set; }
      public string bagQuestion7Comment { get; set; }
      public string bagQuestion8 { get; set; }
      public string bagQuestion8Comment { get; set; }
      public string bagQuestion9 { get; set; }
      public string bagQuestion9Comment { get; set; }
      public string bagQuestion10 { get; set; }
      public string bagQuestion10Comment { get; set; }

      // Contact Film
      public string contactFilmQuestion1 { get; set; }
      public string contactFilmQuestion1Comment { get; set; }
      public string contactFilmQuestion2 { get; set; }
      public string contactFilmQuestion2Comment { get; set; }
      public string contactFilmQuestion3 { get; set; }
      public string contactFilmQuestion3Comment { get; set; }
      public string contactFilmQuestion4 { get; set; }
      public string contactFilmQuestion4Comment { get; set; }
      public string contactFilmQuestion5 { get; set; }
      public string contactFilmQuestion5Comment { get; set; }
      public string contactFilmQuestion6 { get; set; }
      public string contactFilmQuestion6Comment { get; set; }
      public string contactFilmQuestion7 { get; set; }
      public string contactFilmQuestion7Comment { get; set; }
      public string contactFilmQuestion8 { get; set; }
      public string contactFilmQuestion8Comment { get; set; }
      public string contactFilmQuestion9 { get; set; }
      public string contactFilmQuestion9Comment { get; set; }
      public string contactFilmQuestion10 { get; set; }
      public string contactFilmQuestion10Comment { get; set; }

      // Overwrap Film
      public string overwrapFilmQuestion1 { get; set; }
      public string overwrapFilmQuestion1Comment { get; set; }
      public string overwrapFilmQuestion2 { get; set; }
      public string overwrapFilmQuestion2Comment { get; set; }
      public string overwrapFilmQuestion3 { get; set; }
      public string overwrapFilmQuestion3Comment { get; set; }
      public string overwrapFilmQuestion4 { get; set; }
      public string overwrapFilmQuestion4Comment { get; set; }
      public string overwrapFilmQuestion5 { get; set; }
      public string overwrapFilmQuestion5Comment { get; set; }
      public string overwrapFilmQuestion6 { get; set; }
      public string overwrapFilmQuestion6Comment { get; set; }
      public string overwrapFilmQuestion7 { get; set; }
      public string overwrapFilmQuestion7Comment { get; set; }
      public string overwrapFilmQuestion8 { get; set; }
      public string overwrapFilmQuestion8Comment { get; set; }
    }

    public class InspectionItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<InspectionLot> InspectionLots { get; set; }
        public string Description { get; set; }
        public int TotalQuantity { get; set; }
    }

    public class InspectionLot
    {
        public int Id { get; set; }
        public string LotNumber { get; set; }
        public int ItemQuantity { get; set; }
        public string Comment { get; set; }
    }
}