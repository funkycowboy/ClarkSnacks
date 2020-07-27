export class Inspection {
  items: InspectionItem[];
  supplier: number;
  dateReceived: string;
  bolShipmentNumber: string;
  isApprovedSupplier: boolean;
  questions: InspectionQuestions
  result: string;
  disposition: string;
  deviationNumber: string;
  holdStatus: string;
  measuresToPreventRelease: string;
}

export class InspectionLot {
    id: number;
    lotNumber: string;
    itemQuantity: number;
    comment: string;
}

export class InspectionItem {
    id: number;
    name: string;
    inspectionLots: InspectionLot[] = [];
    description: string;
    totalQuantity: number;
}

export class InspectionQuestions {

  // Cartons
  cartonQuestion1: string;
  cartonQuestion1Comment: string;
  cartonQuestion2: string;
  cartonQuestion2Comment: string;
  cartonQuestion3: string;
  cartonQuestion3Comment: string;
  cartonQuestion4: string;
  cartonQuestion4Comment: string;
  cartonQuestion5: string;
  cartonQuestion5Comment: string;;
  cartonQuestion6: string;
  cartonQuestion6Comment: string;
  cartonQuestion7: string;
  cartonQuestion7Comment: string;
  cartonQuestion8: string;
  cartonQuestion8Comment: string;

  // Bags
  bagQuestion1: string;
  bagQuestion1Comment: string;
  bagQuestion2: string;
  bagQuestion2Comment: string;
  bagQuestion3: string;
  bagQuestion3Comment: string;
  bagQuestion4: string;
  bagQuestion4Comment: string;
  bagQuestion5: string;
  bagQuestion5Comment: string;
  bagQuestion6: string;
  bagQuestion6Comment: string;
  bagQuestion7: string;
  bagQuestion7Comment: string;
  bagQuestion8: string;
  bagQuestion8Comment: string;
  bagQuestion9: string;
  bagQuestion9Comment: string;
  bagQuestion10: string;
  bagQuestion10Comment: string;

  // Contact Film
  contactFilmQuestion1: string;
  contactFilmQuestion1Comment: string;
  contactFilmQuestion2: string;
  contactFilmQuestion2Comment: string;
  contactFilmQuestion3: string;
  contactFilmQuestion3Comment: string;
  contactFilmQuestion4: string;
  contactFilmQuestion4Comment: string;
  contactFilmQuestion5: string;
  contactFilmQuestion5Comment: string;
  contactFilmQuestion6: string;
  contactFilmQuestion6Comment: string;
  contactFilmQuestion7: string;
  contactFilmQuestion7Comment: string;
  contactFilmQuestion8: string;
  contactFilmQuestion8Comment: string;
  contactFilmQuestion9: string;
  contactFilmQuestion9Comment: string;
  contactFilmQuestion10: string;
  contactFilmQuestion10Comment: string;

  // Overwrap Film
  overwrapFilmQuestion1: string;
  overwrapFilmQuestion1Comment: string;
  overwrapFilmQuestion2: string;
  overwrapFilmQuestion2Comment: string;
  overwrapFilmQuestion3: string;
  overwrapFilmQuestion3Comment: string;
  overwrapFilmQuestion4: string;
  overwrapFilmQuestion4Comment: string;
  overwrapFilmQuestion5: string;
  overwrapFilmQuestion5Comment: string;
  overwrapFilmQuestion6: string;
  overwrapFilmQuestion6Comment: string;
  overwrapFilmQuestion7: string;
  overwrapFilmQuestion7Comment: string;
  overwrapFilmQuestion8: string;
  overwrapFilmQuestion8Comment: string;
}
