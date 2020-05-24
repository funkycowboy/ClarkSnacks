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
}
