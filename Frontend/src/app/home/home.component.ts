import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  data: any[] = [];
  nuevoProducto: any = {};
  modalRef: boolean = false;

  constructor(private apiService : ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  abrirModal(){
    this.modalRef = true;
    console.log('Modal abierto');
  }

  cerrarModal(){
    this.modalRef = false;
    this.nuevoProducto = {};
    console.log('Modal cerrado');
  }

  llenarData(){
    this.apiService.getProducts().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

  agregarProducto(formulario: NgForm) {
    if (formulario.valid) {
      this.apiService.createProduct(this.nuevoProducto).subscribe(
        (response) => {
          console.log('Producto agregado exitosamente:', response);
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al agregar el producto', error);
        }
      );
    }
  }
  

  eliminarProducto(id: number) {
    this.apiService.deleteProduct(id).subscribe(
      (response) => {
        this.llenarData();
        this.toastComponent.show();
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
        this.toastr.error('Error al eliminar el producto', 'Error');
      }
    );
  }
  

  actualizarProducto(id: number, product: any) {
    this.apiService.updateProduct(id, product).subscribe(
      (response) => {
        this.llenarData();
        this.toastr.info('Producto actualizado con éxito', 'Éxito');
      },
      (error) => {
        console.error('Error al actualizar el producto', error);
        this.toastr.error('Error al actualizar el producto', 'Error');
      }
    );
  }
}
