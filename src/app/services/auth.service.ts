import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_PATHS, TOKEN_STORAGE_KEY } from '../models/constants';

interface JWTToken {
    sub?: string;
    roles?: Array<string>;
    iat?: number;
    exp?: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly url = `${environment.apiUrl}/${API_PATHS.LOGIN}`;

    constructor(private readonly http: HttpClient) {
    }

    static isAdmin(): boolean {
        const data: JWTToken = this.getTokenData();
        return !!data?.roles?.includes('ADMIN');
    }

    private static getTokenData(): JWTToken {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY);
        const jwtHelper = new JwtHelperService();
        return null !== token ? jwtHelper.decodeToken<JWTToken>(token) : {};
    }

    login(data: { email: string; password: string }): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.url, data);
    }
}
