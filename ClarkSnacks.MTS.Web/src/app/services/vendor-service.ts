import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


// environment
import { environment } from '../../environments/environment';

// models
import { Vendor } from '../models/vendor';


@Injectable()
export class VendorService {
    private baseurl = environment.clarkSnacksUrl;
    private controller = "Vendor";

    constructor(private http: HttpClient) { }

    // Get all vendors
    getVendors(){
        let url = this.baseurl + this.controller;

        let promise = new Promise((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then(
                    res => {resolve(res);},
                    msg => {reject(msg);}
                );
        });
        return promise;
    }

    private handleError(error: any): Promise<any> {
        alert('An error occurred: ' + error.message); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
