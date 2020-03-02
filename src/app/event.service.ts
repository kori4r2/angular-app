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
		this.events = newArray(EVENTS.length);
		for(let i = 0; i < EVENTS.length; i++){
			this.events[i] = new Event(EVENTS[i].id, EVENTS[i].description, EVENTS[i].timeSlot[0], EVENTS[i].timeSlot[1]);
		}
		this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
	}

	verifyValidEvent(event: Event): boolean{
		// cria uma array
		// percorre a lista de eventos existentes
			// enquanto o horario de termino for maior que horario de inicio de event não faz nada
			// verifica se o evento atual entra em conflito, se entrar adiciona na nova array
			// se o horario de inicio for maior que o horario do fim de event sai do loop
		// se array esta vazia retorna true
		// se array tiver mais de um elemento retorna false
		// se o id do elemento da array for igual ao id do elemento em conflito retorna true
		// retorna false
		return true; // placeholder
	}

	addEvent(event: Event, onSuccess: Function, onFailure: Function): void{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			if(onFailure) onFailure();
			return;
		}

		let newEvent: Event = new Event(); // isso aqui ja é um pouco de paranoia mas o metodo é publico
		newEvent.copyFrom(event);
		let maxId = this.events.map(e => e.id).reduce(((max, cur) => Math.max(max, cur)), -1);
		newEvent.id = maxId + 1;

		this.events.push(newEvent);
		this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
		if(onSuccess)	onSuccess(); // nunca vai dar erro aqui
	}

	deleteEvent(event: Event, onSuccess: Function, onFailure: Function): void{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			if(onFailure) onFailure();
			return;
		}

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

		let eventIndex: number = this.events.findIndex(e => e.id === event.id);
		if(eventIndex > -1){
			this.events[eventIndex].copyFrom(event);
			this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
			if(onSuccess) onSuccess();
		}else{
			if(onFailure) onFailure();
		}
	}

	getEvents(): Observable<Event[]>{
		// Checa se esta autenticado para realizar a operação
		if(!this.loginService.token || this.loginService.token === ""){
			return of(newArray<Event>(0));
		}

		return of(this.events);
	}
}
