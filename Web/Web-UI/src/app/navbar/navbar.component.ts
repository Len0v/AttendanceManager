import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { 
  constructor(private appComponent: AppComponent) { }

  ngOnInit() {
  }

  toggleSidenav(){
    this.appComponent.toggleSidenav();
  }
}
