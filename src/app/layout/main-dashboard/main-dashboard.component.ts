import { Component } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  activeMenu: string | null = null;
  activeSubMenu: string | null = null;

  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? null : menu;
    if (menu !== 'others') {
      this.activeSubMenu = null; // reset nested submenu when switching main menu
    }
  }

  toggleSubMenu(subMenu: string) {
    this.activeSubMenu = this.activeSubMenu === subMenu ? null : subMenu;
  }
}
