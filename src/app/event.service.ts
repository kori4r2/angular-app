import { Injectable } from '@angular/core';
import { Event } from "./event"
import { EVENTS } from "./mock-events"
import { newArray } from '@angular/compiler/src/util';
import { Observable, of } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class EventService {

	events: Event[];

  constructor() {
		this.events = newArray(EVENTS.length);
		for(let i = 0; i < EVENTS.length; i++){
			this.events[i] = new Event(EVENTS[i].id, EVENTS[i].description, EVENTS[i].timeSlot[0], EVENTS[i].timeSlot[1]);
		}
		this.events.sort((e1, e2) => (e1.timeSlot[0].getTime() - e2.timeSlot[0].getTime()))
	}

	getEvents(): Observable<Event[]>{
		return of(this.events);
	}
}
