import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { AppConfig } from '../config/app.config';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    apiBaseURL = AppConfig.settings.apiServer.baseURL;

    constructor(private http: HttpClient) { }

    requestHeaders() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return httpOptions;
    }

    registerUser(newUser: any) {
        return this.http.post<any>(this.apiBaseURL, newUser, this.requestHeaders())
            .pipe(map(response => {
                let dataPostedUri = response.uri;
                return dataPostedUri;
            }));
    }
}
