import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// prime ng
import { MegaMenuModule, Menubar, MenuModule, MenuItem } from 'primeng/primeng';

@Component({
    //moduleId: module.id,
    selector: 'default-header',
    templateUrl: 'default-header.component.html',
    styleUrls: ['default-header.component.css']
})
export class DefaultHeaderComponent implements OnInit {

    items: MenuItem[];
    constructor(private router: Router) {
    }
    ngOnInit() {
        this.items = [
            {
                label: 'Home',

                'routerLink': ['/home'],
                icon: 'fa fa-home',
            },
            {
                label: 'Inspections',
                icon: 'fa fa-eye',

                items: [
                    {
                        label: 'Perform Inspection',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/home']
                    },
                    {
                        label: 'View Inspections',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/home']
                    },
                    {
                        label: 'Upload Artwork',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/home']
                    }
                ]
            },
            {
                label: 'Material Tracking',
                icon: 'fa fa-search',

                items: [

                    {
                        label: 'Track Material Lots',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/home']
                       
                    }
                ]
            },
            {
                label: 'Reports',
                icon: 'fa fa-table',

                items: [

                    {
                        label: 'Track Material Lots',
                        icon: 'fa fa-arrow-circle-right', 'routerLink': ['/home']

                    }
                ]
            },  
            {
                label: 'Admin',
                icon: 'fa fa-user',

                items: [

                    {
                        label: 'User Admistration',
                        icon: 'fa fa-arrow-circle-right',
                        'routerLink': ['/home']
                    },
                    {
                        label: 'Run Timesheets',
                        icon: 'fa fa-arrow-circle-right',
                        'routerLink': ['/timesheets']
                    },
                    {
                        label: 'Manage Tribe',
                        icon: 'fa fa-arrow-circle-right',
                        'routerLink': ['/tribe']
                    }

                ]
            }
        ];
    }
}
