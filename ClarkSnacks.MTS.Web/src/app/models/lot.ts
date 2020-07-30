export class Lot {
    id: number;
    lotNumber: string;
    itemId: number;
    quantity: number;
}

export class ProcessedLot {
    id: number;
    lotId: string;
    lotNumber: string;
    processedByUserId: number;
    processedByUserName: string;
    lotManuallyEntered: boolean;
    itemId: number;
    lastCaseOnPalette: boolean;
}
