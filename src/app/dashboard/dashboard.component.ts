import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	isLoggedIn: boolean;

  constructor() { }

	onLogout(){
		this.isLoggedIn = false; // placeholder
	}

	onLogin(){
		this.isLoggedIn = true; // placeholder
	}

  ngOnInit(): void {
		this.isLoggedIn = false;
  }

}
