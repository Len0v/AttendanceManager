import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenavMenu(){
    this.sidenav.toggle();
  }
}