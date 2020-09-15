import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeingInOutAnimation } from './../../../animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [fadeingInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  public menuOpen = false
  public links = [
    { route: '/', text: "Weather" },
    { route: 'favorites', text: "Favorites" }
  ]

}
