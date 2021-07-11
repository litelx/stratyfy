import { Injectable } from '@angular/core';
import { Message } from './message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    message = '';
    type: Message = Message.success;

    constructor() { }

    clear() {
        this.message = '';
    }
}
