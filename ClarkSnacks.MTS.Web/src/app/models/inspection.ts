import { Lot } from './lot';

export class Inspection {
  lots: InspectionLot[];
  supplierId: number;
  dateReceived: string;
  bolShipmentNumber: string;
  isApprovedSupplier: boolean;
  questions: InspectionQuestions;
  resultId: number;
  dispositionId: number;
  deviationNumber: string;
  holdStatusId: number;
  measuresToPreventRelease: string;
  inspectedById: number
}

export class InspectionLot {
    id: number;
    itemId: number;
    lotNumber: string;
    quantity: number;
    comment: string;
    createdByUserId: number;
}

export class InspectionItem {
    id: number;
    itemId: number;
    inspectionLots: InspectionLot[] = [];
    totalQuantity: number;
}

export class InspectionQuestions {

  // Cartons
  cartonQuestion1: number;
  cartonQuestion1Comment: string;
  cartonQuestion2: number;
  cartonQuestion2Comment: string;
  cartonQuestion3: number;
  cartonQuestion3Comment: string;
  cartonQuestion4: number;
  cartonQuestion4Comment: string;
  cartonQuestion5: number;
  cartonQuestion5Comment: string;;
  cartonQuestion6: number;
  cartonQuestion6Comment: string;
  cartonQuestion7: number;
  cartonQuestion7Comment: string;
  cartonQuestion8: number;
  cartonQuestion8Comment: string;

  // Bags
  bagQuestion1: number;
  bagQuestion1Comment: string;
  bagQuestion2: number;
  bagQuestion2Comment: string;
  bagQuestion3: number;
  bagQuestion3Comment: string;
  bagQuestion4: number;
  bagQuestion4Comment: string;
  bagQuestion5: number;
  bagQuestion5Comment: string;
  bagQuestion6: number;
  bagQuestion6Comment: string;
  bagQuestion7: number;
  bagQuestion7Comment: string;
  bagQuestion8: number;
  bagQuestion8Comment: string;
  bagQuestion9: number;
  bagQuestion9Comment: string;
  bagQuestion10: number;
  bagQuestion10Comment: string;

  // Contact Film
  contactFilmQuestion1: number;
  contactFilmQuestion1Comment: string;
  contactFilmQuestion2: number;
  contactFilmQuestion2Comment: string;
  contactFilmQuestion3: number;
  contactFilmQuestion3Comment: string;
  contactFilmQuestion4: number;
  contactFilmQuestion4Comment: string;
  contactFilmQuestion5: number;
  contactFilmQuestion5Comment: string;
  contactFilmQuestion6: number;
  contactFilmQuestion6Comment: string;
  contactFilmQuestion7: number;
  contactFilmQuestion7Comment: string;
  contactFilmQuestion8: number;
  contactFilmQuestion8Comment: string;
  contactFilmQuestion9: number;
  contactFilmQuestion9Comment: string;
  contactFilmQuestion10: number;
  contactFilmQuestion10Comment: string;

  // Overwrap Film
  overwrapFilmQuestion1: number;
  overwrapFilmQuestion1Comment: string;
  overwrapFilmQuestion2: number;
  overwrapFilmQuestion2Comment: string;
  overwrapFilmQuestion3: number;
  overwrapFilmQuestion3Comment: string;
  overwrapFilmQuestion4: number;
  overwrapFilmQuestion4Comment: string;
  overwrapFilmQuestion5: number;
  overwrapFilmQuestion5Comment: string;
  overwrapFilmQuestion6: number;
  overwrapFilmQuestion6Comment: string;
  overwrapFilmQuestion7: number;
  overwrapFilmQuestion7Comment: string;
  overwrapFilmQuestion8: number;
  overwrapFilmQuestion8Comment: string;
}
