import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class FormEventPubSubService {
    public emitter = new EventEmitter<any>();

    public publishEvent(event: any) {
        this.emitter.emit(event);
    }
}
