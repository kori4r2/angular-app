import { Component, OnInit } from '@angular/core';
import { Event } from "../event";
import { EventService } from "../event.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
	events: Event[];
	selectedEvent: Event = null;
	onSelect(event: Event){
		this.selectedEvent = event;
	}
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
		this.getEvents();
  }

	getEvents(){
		this.eventService.getEvents().subscribe(events => this.events = events);
	}
}
