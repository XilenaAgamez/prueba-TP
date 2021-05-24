import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private _productoService: ProductosService, 
    private aRouter: ActivatedRoute,
    private toastr: ToastrService) {
    this.productoForm = this.fb.group({
      nombre:['', Validators.required],
      categoria:['', Validators.required],
      precio:['', Validators.required],
      descripcion:['', Validators.required],
    })

    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('nombre')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      precio: this.productoForm.get('precio')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
    }

    if(this.id !== null){
      //editamos producto
      this.toastr.success('El Producto Fue editado  Con Exito!') 
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })

    }else {
      //agregamos  producto
      console.log(PRODUCTO);
      this.toastr.success('El Producto Fue Registrado Con Exito!') 
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => { 
      this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          nombre: data.nombre,
          categoria: data.categoria,
          precio: data.precio,
          descripcion: data.descripcion
        })
      })
    }
  }
}
