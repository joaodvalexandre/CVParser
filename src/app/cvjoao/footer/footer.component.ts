import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import cv from '../../../assets/CV.json'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  cvFile = cv;
  currentYear = new Date().getFullYear();
}
