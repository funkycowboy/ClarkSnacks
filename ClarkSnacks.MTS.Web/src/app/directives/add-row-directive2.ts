import { Directive, Input, HostListener } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
    selector: '[pAddRow2]'
})
export class AddRowDirective2 {
    @Input() table: Table;
    @Input() newRow2: any;

    @HostListener('click', ['$event'])
    onClick(event: Event) {
        debugger
        // Insert a new row
        this.table.value.push(this.newRow2);

        // Set the new row in edit mode
        //this.table.initRowEdit(this.newRow2);

        event.preventDefault();
    }
}
