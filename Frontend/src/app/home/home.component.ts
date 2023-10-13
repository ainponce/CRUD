import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  constructor(private apiService : ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
    this.apiService.getProducts().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

  eliminarProducto(id: number) {
    this.apiService.deleteProduct(id).subscribe(
      (response) => {
        this.llenarData();
        this.toastr.success('Producto eliminado con éxito', 'Éxito');
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
