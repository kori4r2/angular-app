import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from "../event";
import { DEFAULT_EVENT } from "../mock-events";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnChanges {

	@Input() event: Event;
	eventCopy: Event;

  constructor() { }

  ngOnInit(): void {
  }

	ngOnChanges(changes: SimpleChanges): void {
		if(changes["event"].currentValue == null) this.eventCopy = null;
		else
			this.eventCopy = new Event(changes["event"].currentValue.id,
																 changes["event"].currentValue.description, 
																 changes["event"].currentValue.timeSlot[0], 
																 changes["event"].currentValue.timeSlot[1]);
	}
}
