import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './add-user-modal-window.component.html'
})
export class AddUserModalWindowComponent {
    constructor(public activeModal: NgbActiveModal){}
}