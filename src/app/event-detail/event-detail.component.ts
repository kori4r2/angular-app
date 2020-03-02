import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Event } from "../event";
import { EventService } from "../event.service"

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

	@Input() set event(value: Event){
		if(!value){
			this.eventCopy = null;
			this.isAddition = false;
		}else if(value.id != -1){
			this.isAddition = false;
			this.eventCopy = new Event(value.id,
																 value.description, 
																 value.timeSlot[0], 
																 value.timeSlot[1]);
		}else{
			this.isAddition = true;
			this.eventCopy = new Event();
		}
	}
	@Input() onClose: Function;

	isAddition: boolean;
	private isWaiting: boolean;
	eventCopy: Event;

  constructor(private eventService: EventService) {
		this.onFailure = this.onFailure.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
	}

	addNewEvent(): void{
		this.isAddition = true;
		this.eventCopy = new Event();
	}

	closeDetails(): void{
		this.isAddition = false;
		this.eventCopy = null;
		if(this.onClose) this.onClose();
	}

	onFailure(): void{
		this.isWaiting = false;
		console.log("Erro de resposta do servidor");
	}

	onSuccess(): void{
		this.isWaiting = false;
		this.closeDetails();
	}

	addThisEvent(): void{
		if(this.isWaiting) return;
		if(this.eventService.verifyValidEvent(this.eventCopy)){
			console.log("Conflito de horarios"); // Exibir mensagem de erro
			return;
		}

		this.isWaiting = true;
		this.eventService.addEvent(this.eventCopy, this.onSuccess, this.onFailure)
	}

	deleteThisEvent(): void{
		if(this.isWaiting) return;

		this.isWaiting = true;
		this.eventService.deleteEvent(this.eventCopy, this.onSuccess, this.onFailure)
	}

	updateThisEvent(): void{
		if(this.isWaiting) return;
		if(this.eventService.verifyValidEvent(this.eventCopy)){
			console.log("Conflito de horarios"); // Exibir mensagem de erro
			return;
		}

		this.isWaiting = true;
		this.eventService.updateEvent(this.eventCopy, this.onSuccess, this.onFailure)
	}

  ngOnInit(): void {
		this.isWaiting = false;
  }
}
