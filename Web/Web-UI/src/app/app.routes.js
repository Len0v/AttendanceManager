"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var login_page_component_1 = require("./login-page/login-page.component");
var main_component_1 = require("./main/main.component");
var user_list_component_1 = require("./user-list/user-list.component");
var events_component_1 = require("./events/events.component");
var non_cyclical_events_component_1 = require("./events/event-details/non-cyclical-events/non-cyclical-events.component");
var cyclical_events_component_1 = require("./events/event-details/cyclical-events/cyclical-events.component");
exports.routes = [
    { path: '', component: main_component_1.MainComponent },
    { path: 'login', component: login_page_component_1.LoginPageComponent },
    { path: 'students', component: user_list_component_1.UserListComponent },
    { path: 'events', component: events_component_1.EventsComponent },
    { path: 'events/details/noncyclical/:id', component: non_cyclical_events_component_1.NonCyclicalEventsComponent },
    { path: 'events/details/cyclical/:id', component: cyclical_events_component_1.CyclicalEventsComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes);
