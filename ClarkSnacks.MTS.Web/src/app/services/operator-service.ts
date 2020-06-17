import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';


// environment
import { environment } from '../../environments/environment';

// models

@Injectable()
export class OperatorService {
    private baseurl = environment.clarkSnacksUrl;
    private controller = "Operator";

    constructor(private http: HttpClient) { }

    // Get operators
    getOperators(){
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

    // Get items by material category
    getItemsByMaterialCategory(materialCategoryId: number) {
        let url = this.baseurl + this.controller + "/material-category/" + materialCategoryId;
        debugger
        let promise = new Promise((resolve, reject) => {
            this.http.get(url)
                .toPromise()
                .then(
                    res => { resolve(res); },
                    msg => { reject(msg); }
                );
        });
        return promise;
    }

    private handleError(error: any): Promise<any> {
        alert('An error occurred: ' + error.message); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
