import { Component, ViewChild } from '@angular/core';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SidenavMenuComponent)
  private SidenavMenuComponent: SidenavMenuComponent

  title = 'Attendance Manager';

  toggleSidenav(){
    this.SidenavMenuComponent.toggleSidenavMenu();
  }
}
