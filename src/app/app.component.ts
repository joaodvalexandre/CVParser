import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  slider
} from './app.animations';
import { NavbarComponent } from './cvjoao/navbar/navbar.component';
import { FooterComponent } from './cvjoao/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [ slider ]
})
export class AppComponent {
  handleScrollToTop() {
    const scrollableElement = document.querySelector('main');
    if (scrollableElement) {
      scrollableElement.scrollTop = 0;
    }
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
