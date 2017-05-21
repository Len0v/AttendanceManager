"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserListComponent = (function () {
    function UserListComponent() {
        this.users = [
            { "id": 1, "name": "Wojciech", "surname": "Agacinski", "sex": 0, "birthDate": "1995-06-06T00:00:00", "pesel": "95060605757", "isStudent": true, "studentNumber": "121998" }
        ];
    }
    UserListComponent.prototype.ngOnInit = function () {
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    core_1.Component({
        selector: 'app-user-list',
        templateUrl: './user-list.component.html',
        styleUrls: ['./user-list.component.css']
    })
], UserListComponent);
exports.UserListComponent = UserListComponent;
