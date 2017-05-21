"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EventRemoveDialog = (function () {
    function EventRemoveDialog(MdDialogRef, EventsService) {
        this.MdDialogRef = MdDialogRef;
        this.EventsService = EventsService;
    }
    EventRemoveDialog.prototype.accept = function () {
        var _this = this;
        this.EventsService.deleteEventById(this.EventsService.selectedEvent['id']).subscribe(function () { return _this.MdDialogRef.close(); });
    };
    EventRemoveDialog.prototype.decline = function () {
        this.MdDialogRef.close();
    };
    return EventRemoveDialog;
}());
EventRemoveDialog = __decorate([
    core_1.Component({
        templateUrl: './remove-event-dialog.html',
        styleUrls: ['./remove-event-dialog.css']
    })
], EventRemoveDialog);
exports.EventRemoveDialog = EventRemoveDialog;
