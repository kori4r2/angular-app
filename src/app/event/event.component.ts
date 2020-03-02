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

	onSelect(event: Event): void{
		this.selectedEvent = event;
	}

  constructor(private eventService: EventService) {
		this.onCloseDetails = this.onCloseDetails.bind(this);
	}

	onCloseDetails(): void{
		this.selectedEvent = null;
	}

  ngOnInit(): void {
		this.getEvents();
  }

	getEvents(): void{
		this.eventService.getEvents().subscribe(events => this.events = events);
	}
}
