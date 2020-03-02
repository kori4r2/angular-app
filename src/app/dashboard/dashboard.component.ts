import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	isLoggedIn: boolean;

  constructor() { }

	onLogout(): void{
		this.isLoggedIn = false; // placeholder
	}

	onLogin(): void{
		this.isLoggedIn = true; // placeholder
	}

  ngOnInit(): void {
		this.isLoggedIn = false;
  }

}
