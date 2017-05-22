import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  public users = [
    {"id":1,"name":"Wojciech","surname":"Agacinski","sex":0,"birthDate":"1995-06-06T00:00:00","pesel":"95060605757","isStudent":true,"studentNumber":"121998"}
  ]

  constructor() {
  }

  ngOnInit() {

  }

}
