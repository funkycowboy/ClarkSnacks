import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


// environment
import { environment } from '../../environments/environment';

// models

@Injectable()
export class ItemService {
    private baseurl = environment.clarkSnacksUrl;
    private controller = "Item";

    constructor(private http: HttpClient) { }

    // Get all items
    getItems(){
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
