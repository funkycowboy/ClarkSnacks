export class Inspection {
    id: number;
    item: InspectionItem;
    lotNumbers: string[];
}

export class InspectionItem {
    name: string;
    description: string;
}
