export class Lot {
    id: number;
    materialCategory: string;
    lotNumber: string;
    itemId: number;
    itemName: string;
    vendorId: number;
    dateReceived: string;
    quantity: number;
    bolShipmentNumber
    StatusId: number;
}

export class ProcessedLot {
    id: number;
    lotId: string;
    processedByUserId: number;
}
