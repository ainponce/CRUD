import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
   
    showMyToast = false;
  
    showToast() {
      this.showMyToast = true;
    }
  
    hideToast() {
      this.showMyToast = false;
    }
}
