import { CommonModule, NgFor } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgFor, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  @Output() scrollToTopEvent = new EventEmitter<void>();

  triggerScrollToTop() {
    this.scrollToTopEvent.emit();
  }
}
