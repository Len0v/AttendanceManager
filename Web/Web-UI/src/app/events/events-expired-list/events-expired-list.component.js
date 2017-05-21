"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_remove_dialog_component_1 = require(".././remove-event-dialog/event-remove-dialog.component");
var remove_event_dialog_config_1 = require(".././remove-event-dialog/remove-event-dialog-config");
var EventsExpiredListComponent = (function () {
    function EventsExpiredListComponent(EventsService, Router, MdDialog) {
        this.EventsService = EventsService;
        this.Router = Router;
        this.MdDialog = MdDialog;
        this.config = remove_event_dialog_config_1.DialogConfig;
    }
    EventsExpiredListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.EventsService.loadExpiredEvents().subscribe(function (events) {
            _this.events = events;
            _this.EventsService.setExpiredEvents(events);
        });
    };
    EventsExpiredListComponent.prototype.showDetails = function (event) {
        this.Router.navigate(['events/details/cyclical', event.id]);
    };
    EventsExpiredListComponent.prototype.removeEvent = function (event) {
        this.EventsService.selectedEvent = event;
        this.openDialog();
    };
    EventsExpiredListComponent.prototype.openDialog = function () {
        var dialogRef = this.MdDialog.open(event_remove_dialog_component_1.EventRemoveDialog, this.config);
    };
    return EventsExpiredListComponent;
}());
EventsExpiredListComponent = __decorate([
    core_1.Component({
        selector: 'app-events-expired-list',
        templateUrl: './events-expired-list.component.html',
        styleUrls: ['./events-expired-list.component.css']
    })
], EventsExpiredListComponent);
exports.EventsExpiredListComponent = EventsExpiredListComponent;
