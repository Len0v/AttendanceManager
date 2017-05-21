"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_details_edit_dialog_config_1 = require("./event-details-edit-dialog/event-details-edit-dialog-config");
var event_details_edit_dialog_service_1 = require("./event-details-edit-dialog/event-details-edit-dialog.service");
var CyclicalEventsComponent = (function () {
    function CyclicalEventsComponent(ActivatedRoute, EventsService, EventDetailsEditDialogService) {
        var _this = this;
        this.ActivatedRoute = ActivatedRoute;
        this.EventsService = EventsService;
        this.EventDetailsEditDialogService = EventDetailsEditDialogService;
        this.config = event_details_edit_dialog_config_1.DialogConfig;
        this.ActivatedRoute.params.subscribe(function (param) {
            _this.eventId = +param['id'];
            _this.event = _this.EventsService.findEventById(_this.eventId);
        });
    }
    CyclicalEventsComponent.prototype.ngOnInit = function () {
    };
    CyclicalEventsComponent.prototype.enableEditMode = function () {
        if (this.event['isCyclical']) {
            this.openDialog();
        }
    };
    CyclicalEventsComponent.prototype.openDialog = function () {
        this.EventDetailsEditDialogService.open(this.config);
    };
    return CyclicalEventsComponent;
}());
CyclicalEventsComponent = __decorate([
    core_1.Component({
        selector: 'app-cyclical-events',
        templateUrl: './cyclical-events.component.html',
        styleUrls: ['./cyclical-events.component.css'],
        providers: [event_details_edit_dialog_service_1.EventDetailsEditDialogService]
    })
], CyclicalEventsComponent);
exports.CyclicalEventsComponent = CyclicalEventsComponent;
