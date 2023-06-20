import { Component } from '@angular/core';
import { fa1, faGears } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'ctpb-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    faGears = faGears;
}
