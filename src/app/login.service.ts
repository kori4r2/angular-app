import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	readonly user = { // placeholder
		username: "user",
		password: "12345",
		token: "56K4A5GJH65SF5H6" // Isso deveria ser recebido do servidor ao tentar autenticar
	};
	token: string = "";

  constructor() { }

	login(username: string, password: string, onSuccess: Function, onFailure: Function): void{
		// Placeholder sera feito com apenas um usuario valido
		// A implementação correta seria por exemplo usando graphql chamar uma mutação que envia username e password
		// e recebe um token como resposta, sendo uma string vazia quando a autenticação falhar.
		if(username === this.user.username && password === this.user.password){
			this.token = this.user.token;
			if(onSuccess) onSuccess();
		}else{
			this.token = "";
			if(onFailure) onFailure();
		}
	}

	logout(onLogout: Function): void{
		this.token = "";
		if(onLogout) onLogout();
	}
}
