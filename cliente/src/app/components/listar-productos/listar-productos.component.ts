import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor(private _productoService: ProductosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos(){
    this._productoService.getProducto().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);

    })
  }

  eliminarProducto(id: any){
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El Producto Fue Eliminado Con Exito!') ;
      this.obtenerProductos();
    }, error => {
      console.log(error);
    })
  }
}
