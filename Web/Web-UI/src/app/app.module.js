"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jQuery = require("jquery");
require("moment");
require("fullcalendar");
window.jQuery = window.$ = jQuery;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var animations_1 = require("@angular/platform-browser/animations");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular2_moment_1 = require("angular2-moment");
var angular2_cool_storage_1 = require("angular2-cool-storage");
var app_component_1 = require("./app.component");
var sidenav_menu_component_1 = require("./sidenav-menu/sidenav-menu.component");
var login_page_component_1 = require("./login-page/login-page.component");
var app_routes_1 = require("./app.routes");
var main_component_1 = require("./main/main.component");
var navbar_component_1 = require("./navbar/navbar.component");
var user_list_component_1 = require("./user-list/user-list.component");
var events_component_1 = require("./events/events.component");
var events_list_component_1 = require("./events/events-list/events-list.component");
var events_expired_list_component_1 = require("./events/events-expired-list/events-expired-list.component");
var event_remove_dialog_component_1 = require("./events/remove-event-dialog/event-remove-dialog.component");
var events_service_1 = require("./events/events-services/events.service");
var storage_service_1 = require("./storage.service");
var non_cyclical_events_component_1 = require("./events/event-details/non-cyclical-events/non-cyclical-events.component");
var cyclical_events_component_1 = require("./events/event-details/cyclical-events/cyclical-events.component");
var event_details_edit_dialog_component_1 = require("./events/event-details/cyclical-events/event-details-edit-dialog/event-details-edit-dialog.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            sidenav_menu_component_1.SidenavMenuComponent,
            login_page_component_1.LoginPageComponent,
            main_component_1.MainComponent,
            navbar_component_1.NavbarComponent,
            user_list_component_1.UserListComponent,
            events_component_1.EventsComponent,
            events_list_component_1.EventsListComponent,
            events_expired_list_component_1.EventsExpiredListComponent,
            event_remove_dialog_component_1.EventRemoveDialog,
            non_cyclical_events_component_1.NonCyclicalEventsComponent,
            cyclical_events_component_1.CyclicalEventsComponent,
            event_details_edit_dialog_component_1.EventDetailsEditDialogComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            material_1.MaterialModule.forRoot(),
            app_routes_1.routing,
            flex_layout_1.FlexLayoutModule,
            animations_1.BrowserAnimationsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            angular2_moment_1.MomentModule,
            angular2_cool_storage_1.CoolStorageModule
        ],
        entryComponents: [
            event_remove_dialog_component_1.EventRemoveDialog,
            event_details_edit_dialog_component_1.EventDetailsEditDialogComponent
        ],
        providers: [events_service_1.EventsService, storage_service_1.StorageService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
