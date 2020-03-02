import {newArray} from '@angular/compiler/src/util';

export class Event {
	id: number;
	description: string;
	timeSlot: Date[];

	constructor(_id?: number, _description?: string, _startTime?: Date, _endTime?: Date){
		this.id = _id? _id : -1;
		this.description = _description? _description : "Novo evento";
		this.timeSlot = newArray(2);
		this.timeSlot[0] = _startTime? new Date(_startTime.getTime()) : new Date();
		this.timeSlot[1] = _endTime? new Date(_endTime.getTime()) : new Date();
	}

	copyFrom(other: Event): void{
		this.id = other.id;
		this.description = other.description;
		this.timeSlot = newArray(2);
		this.timeSlot[0] = new Date(other.timeSlot[0].getTime());
		this.timeSlot[1] = new Date(other.timeSlot[1].getTime());
	}
}
