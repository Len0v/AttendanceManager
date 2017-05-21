"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EventDetailsEditDialogComponent = (function () {
    function EventDetailsEditDialogComponent(MdDialogRef, storage) {
        this.MdDialogRef = MdDialogRef;
        this.storage = storage;
    }
    EventDetailsEditDialogComponent.prototype.ngOnInit = function () {
    };
    EventDetailsEditDialogComponent.prototype.accept = function () {
        this.storage.set('editAllFutureEvents', true);
        this.MdDialogRef.close();
        return this.MdDialogRef.afterClosed();
    };
    EventDetailsEditDialogComponent.prototype.decline = function () {
        this.storage.set('editAllFutureEvents', false);
        this.MdDialogRef.close();
    };
    return EventDetailsEditDialogComponent;
}());
EventDetailsEditDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-event-details-edit-dialog',
        templateUrl: './event-details-edit-dialog.component.html',
        styleUrls: ['./event-details-edit-dialog.component.css']
    })
], EventDetailsEditDialogComponent);
exports.EventDetailsEditDialogComponent = EventDetailsEditDialogComponent;
