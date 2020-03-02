import { Component, OnInit } from '@angular/core';
import {LoginService} from 'src/app/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	isLoggedIn: boolean;
	private isWaiting: boolean;
	username: string;
	password: string;
	failedLogin: boolean;

  constructor(private loginService: LoginService) {
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onFailure = this.onFailure.bind(this);
	}

	tryLogin(): void{
		if(this.isWaiting) return;

		this.isWaiting = true;
		this.loginService.login(this.username, this.password, this.onLogin, this.onFailure)
	}

	tryLogout(): void{
		if(this.isWaiting) return;

		this.isWaiting = true;
		this.loginService.logout(this.onLogout);
	}

	onLogout(): void{
		this.isWaiting = false;
		this.isLoggedIn = false;
	}

	onLogin(): void{
		this.isWaiting = false;
		this.isLoggedIn = true;
	}

	onFailure(): void{
		this.isWaiting = false;
		this.failedLogin = true;
	}

  ngOnInit(): void {
		this.isLoggedIn = (this.loginService.token && this.loginService.token != "");
		this.failedLogin = false;
  }

}
