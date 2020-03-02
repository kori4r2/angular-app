import { Injectable } from '@angular/core';
import { Event } from "./event"
import { EVENTS } from "./mock-events"
import { newArray } from '@angular/compiler/src/util';
import { Observable, of } from "rxjs"
import { LoginService } from 'src/app/login.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

	events: Event[];

  constructor(private loginService: LoginService) {
		this.events = newArray(EVENTS.length); // placeholder
		for(let i = 0; i < EVENTS.length; i++){
			this.events[i] = new Event(EVENTS[i].id, EVENTS[i].description, EVENTS[i].timeSlot[0], EVENTS[i].timeSlot[1]);
		}
		// O ideal seria aqui fazer um subscribe para receber todos os eventos desse usuario salvos no banco de dados
		// é necessário usar o token de loginservice para isso, e é necessário garantir que os dados estão atualizados quando o token muda
		// Sempre que o valor recebido for diferente é preciso fazer essa chamada de sort como um callback
		this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
	}

	verifyValidEvent(event: Event): boolean{
		// cria uma array
		let collisions: Event[] = newArray<Event>(0);
		// percorre a lista de eventos existentes
		for(let i = 0; i < this.events.length; i++){
			// enquanto o horario de termino for maior que horario de inicio de event não faz nada
			if(this.events[i].timeSlot[1].getTime() >= event.timeSlot[0].getTime()){ 
				if(this.events[i].timeSlot[0].getTime() >= event.timeSlot[1].getTime()){
					// se o horario de inicio for maior que o horario do fim de event sai do loop
					break;
				}else{
					// se o evento atual entra em conflito adiciona na nova array
					collisions.push(this.events[i]);
				}
			}
		}
		// se array esta vazia retorna true
		if(collisions.length <= 0) return true;
		// se array tiver mais de um elemento retorna false
		if(collisions.length > 1) return false;
		// se o id do elemento da array for igual ao id do elemento em conflito retorna true
		return (collisions[0].id === event.id);
	}

	addEvent(event: Event, onSuccess: Function, onFailure: Function): void{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			if(onFailure) onFailure();
			return;
		}

		let newEvent: Event = new Event(); // isso aqui ja é um pouco de paranoia mas o metodo é publico
		newEvent.copyFrom(event);

		// Obtem o novo id, numa implementação completa isso é gerado na inserção no banco de dados
		let maxId = this.events.map(e => e.id).reduce(((max, cur) => Math.max(max, cur)), -1);
		newEvent.id = maxId + 1;

		// Aqui deve ser feita a chamada de inserção no banco de dados, chamando onSuccess e onFailure
		// dependendo do resultado da operação
		this.events.push(newEvent);
		// O sort não precisa ser feito aqui, pode ser feito apenas quando ele recebe a lista atualizada do servidor
		this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
		if(onSuccess)	onSuccess(); // nunca vai dar erro aqui
	}

	deleteEvent(event: Event, onSuccess: Function, onFailure: Function): void{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			if(onFailure) onFailure();
			return;
		}

		// Aqui deve ser feita a chamada de remoção no banco de dados, chamando onSuccess e onFailure
		// dependendo do resultado da operação
		let eventIndex: number = this.events.findIndex(e => e.id === event.id);
		if(eventIndex > -1){
			this.events.splice(eventIndex, 1);
			if(onSuccess) onSuccess();
		}else{
			if(onFailure) onFailure();
		}
	}

	updateEvent(event: Event, onSuccess: Function, onFailure: Function): void{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			if(onFailure) onFailure();
			return;
		}

		// Aqui deve ser feita a chamada de alteração no banco de dados, chamando onSuccess e onFailure
		// dependendo do resultado a operação
		let eventIndex: number = this.events.findIndex(e => e.id === event.id);
		if(eventIndex > -1){
			this.events[eventIndex].copyFrom(event);
			// O sort não precisa ser feito aqui, pode ser feito apenas quando ele recebe a lista atualizada do servidor
			this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
			if(onSuccess) onSuccess();
		}else{
			if(onFailure) onFailure();
		}
	}

	getEvents(): Observable<Event[]>{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			// Caso não esteja, sempre retorna uma lista vazia
			// Uma abordagem melhor seria fazer a pagina redirecionar para a tela de login
			return of(newArray<Event>(0));
		}

		return of(this.events);
	}
}
