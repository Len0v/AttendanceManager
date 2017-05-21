"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var EventsService = (function () {
    function EventsService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.incomingEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/incoming';
        this.activeEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/active';
        this.expiredEventsApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/expired';
        this.deleteEventbyIdApiUrl = 'http://attendancemanagerapi.azurewebsites.net/api/events/';
    }
    EventsService.prototype.loadIncomingEvents = function () {
        return this.http.get(this.incomingEventsApiUrl)
            .map(this.extractData);
    };
    EventsService.prototype.loadActiveEvents = function () {
        return this.http.get(this.activeEventsApiUrl)
            .map(this.extractData);
    };
    EventsService.prototype.loadExpiredEvents = function () {
        return this.http.get(this.expiredEventsApiUrl)
            .map(this.extractData);
    };
    EventsService.prototype.deleteEventById = function (id) {
        return this.http.delete(this.deleteEventbyIdApiUrl + id);
    };
    EventsService.prototype.setIncomingEvents = function (events) {
        this.IncomingEvents = events;
        this.storage.set('IncomingEvents', this.IncomingEvents);
    };
    EventsService.prototype.setActiveEvents = function (events) {
        this.ActiveEvents = events;
        this.storage.set('ActiveEvents', this.ActiveEvents);
    };
    EventsService.prototype.setExpiredEvents = function (events) {
        this.ExpiredEvents = events;
        this.storage.set('ExpiredEvents', this.ExpiredEvents);
    };
    EventsService.prototype.getActiveEvents = function () {
        return this.ActiveEvents;
    };
    EventsService.prototype.getExpiredEvents = function () {
        return this.ExpiredEvents;
    };
    EventsService.prototype.findEventById = function (id) {
        if (!this.IncomingEvents) {
            this.IncomingEvents = this.storage.get('IncomingEvents');
        }
        if (!this.ActiveEvents) {
            this.ActiveEvents = this.storage.get('ActiveEvents');
        }
        if (!this.ExpiredEvents) {
            this.ExpiredEvents = this.storage.get('ExpiredEvents');
        }
        return this.IncomingEvents.concat(this.ActiveEvents, this.ExpiredEvents).filter(function (x) { return x['id'] === id; })[0];
    };
    EventsService.prototype.extractData = function (res) {
        return res.json() || {};
    };
    return EventsService;
}());
EventsService = __decorate([
    core_1.Injectable()
], EventsService);
exports.EventsService = EventsService;
