import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-popup',
  templateUrl: './sticky-popup.component.html',
  styleUrls: ['./sticky-popup.component.scss'],
  imports: [NgIf],
})
export class StickyPopupComponent {
  @Input() label: string = '';
}
