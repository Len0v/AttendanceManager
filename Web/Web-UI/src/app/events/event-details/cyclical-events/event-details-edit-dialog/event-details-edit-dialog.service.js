"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_details_edit_dialog_component_1 = require("./event-details-edit-dialog.component");
var EventDetailsEditDialogService = (function () {
    function EventDetailsEditDialogService(MdDialog) {
        this.MdDialog = MdDialog;
    }
    EventDetailsEditDialogService.prototype.open = function (config) {
        var dialogRef;
        dialogRef = this.MdDialog.open(event_details_edit_dialog_component_1.EventDetailsEditDialogComponent, config);
        return dialogRef.afterClosed();
    };
    return EventDetailsEditDialogService;
}());
EventDetailsEditDialogService = __decorate([
    core_1.Injectable()
], EventDetailsEditDialogService);
exports.EventDetailsEditDialogService = EventDetailsEditDialogService;
