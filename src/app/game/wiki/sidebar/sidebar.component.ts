import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [ RouterModule ]
})
export class SidebarComponent {

  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.router.navigate(['game/wiki/' + url]);
  }

}
