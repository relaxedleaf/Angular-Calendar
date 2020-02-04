import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_CONSTANT } from 'src/app/constants/apiConstants';

@Injectable()
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	checkValidEmail(email): Observable<any> {
		return this.http.post(
			`${environment.api_url}${API_CONSTANT.AUTH_API.CHECKVALIDEMAIL}`,
			{
				email: email
			}
        );
	}
}
