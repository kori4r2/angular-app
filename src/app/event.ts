import {newArray} from '@angular/compiler/src/util';

export class Event {
	id: number;
	description: string;
	timeSlot: Date[];

	constructor(_id: number, _description: string, _startTime: Date, _endTime: Date){
		this.id = _id;
		this.description = _description;
		this.timeSlot = newArray(2);
		this.timeSlot[0] = new Date(_startTime.getTime());
		this.timeSlot[1] = new Date(_endTime.getTime());
	}

	copyFrom(other: Event){
		this.id = other.id;
		this.description = other.description;
		this.timeSlot = newArray(2);
		this.timeSlot[0] = new Date(other.timeSlot[0].getTime());
		this.timeSlot[1] = new Date(other.timeSlot[1].getTime());
	}
}
