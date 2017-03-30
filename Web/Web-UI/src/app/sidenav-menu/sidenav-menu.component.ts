import { Component, OnInit, ViewChildren } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {
  @ViewChildren('sidenav') sidenav: MdSidenav;

  constructor() { }

  ngOnInit() {
  }

  openSidenavMenu(){
    console.log('second')
    // this.sidenav.open();
    console.log(this.sidenav)
  }

}
