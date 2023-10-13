import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
   @ViewChild('toast', { static: true }) toast!: ElementRef;

   show() {
    this.toast.nativeElement.style.display = 'block';
  }

  hide() {
    this.toast.nativeElement.style.display = 'none';
  }
}
