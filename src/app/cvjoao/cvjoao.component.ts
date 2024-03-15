import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import cv from '../../assets/CV.json';


@Component({
  selector: 'app-cvjoao',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './cvjoao.component.html',
  styleUrl: './cvjoao.component.css'
})
export class CVJoaoComponent {
  cvFile = cv;
}
