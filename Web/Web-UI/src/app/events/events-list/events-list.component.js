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
var EventsListComponent = (function () {
    function EventsListComponent(EventsService, Router, MdDialog) {
        var _this = this;
        this.EventsService = EventsService;
        this.Router = Router;
        this.MdDialog = MdDialog;
        this.config = remove_event_dialog_config_1.DialogConfig;
        this.events = [];
        this.EventsService.loadIncomingEvents().subscribe(function (incomingEvents) {
            _this.events = _this.events.concat(incomingEvents);
            _this.EventsService.setIncomingEvents(incomingEvents);
        });
        this.EventsService.loadActiveEvents().subscribe(function (activeEvents) {
            _this.events = _this.events.concat(activeEvents);
            _this.EventsService.setActiveEvents(activeEvents);
        });
    }
    EventsListComponent.prototype.ngOnInit = function () {
    };
    EventsListComponent.prototype.showDetails = function (event) {
        this.Router.navigate(['events/details/cyclical', event.id]);
    };
    EventsListComponent.prototype.removeEvent = function (event) {
        this.EventsService.selectedEvent = event;
        this.openDialog();
    };
    EventsListComponent.prototype.openDialog = function () {
        this.MdDialog.open(event_remove_dialog_component_1.EventRemoveDialog, this.config);
    };
    return EventsListComponent;
}());
EventsListComponent = __decorate([
    core_1.Component({
        selector: 'app-events-list',
        templateUrl: './events-list.component.html',
        styleUrls: ['./events-list.component.css']
    })
], EventsListComponent);
exports.EventsListComponent = EventsListComponent;
