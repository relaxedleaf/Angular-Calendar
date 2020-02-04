import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { API_CONSTANT } from "src/app/constants/apiConstants";
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
	constructor(private http: HttpClient, private router: Router) {}

	checkValidEmail(email): Observable<any> {
		return this.http.post(
			`${environment.api_url}${API_CONSTANT.AUTH_API.CHECKVALIDEMAIL}`,
			{
				email: email
			}
		);
	}

	signup(first_name, middle_name, last_name, email, password, password_confirmation): Observable<any> {
		return this.http.post(
			`${environment.api_url}${API_CONSTANT.AUTH_API.SIGNUP}`,
			{
				first_name,
				middle_name,
				last_name,
				email,
                password,
                password_confirmation
			}
		);
    }

	logout() {
		this.user.next(null);
        this.router.navigate([""]);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    login(email, password): Observable<any>{
		return this.http.post(
			`${environment.api_url}${API_CONSTANT.AUTH_API.LOGIN}`,
			{
				email,
                password
			}
		);
    }

	autoLogin() {
		const userData: {
			first_name: string;
            middle_name: string;
            last_name: string;
            email: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(localStorage.getItem("userData"));
		if (!userData) {
			return;
		}

		const loadedUser = new User(
            userData.first_name,
            userData.middle_name,
            userData.last_name,
            userData.email,
			userData._token,
			new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    public handleAuthentication(
		first_name: string,
        middle_name: string,
        last_name: string,
        email: string,
		token: string,
		expiresIn: number
	) {
		const expirationData = new Date(
			new Date().getTime() + expiresIn * 1000
		);
		const user = new User(first_name, middle_name, last_name, email, token, expirationData);
        this.user.next(user);
		localStorage.setItem("userData", JSON.stringify(user));
	}
}
