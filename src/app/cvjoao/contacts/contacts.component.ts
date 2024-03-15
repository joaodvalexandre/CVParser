import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import cv from '../../../assets/CV.json';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  cvFile = cv;
}
