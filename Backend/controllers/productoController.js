const Producto = require("../models/Producto");


exports.crearProducto = async (req, res) => {
    
    try{

        let producto;

        //creamos el producto
        producto =  new Producto(req.body);

       await producto.save();
       res.send(producto);

    } catch  (error) { 
        console.log(error);
        res.status(500).send('hubo un error');
    }
}
exports.obtenerProductos = async (req, res)=> {
    try{

        const productos = await Producto.find();
        res.json(productos) 

    }catch  (error) { 
        console.log(error);
        res.status(500).send('hubo un error');
    }
}
exports.actualizarProducto = async ( req, res) =>{
    try{

        const {nombre, categoria, precio, descripcion} = req.body;
        let producto =  await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'no existe ese producto'})
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.precio = precio;
        producto.descripcion = descripcion;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id },producto,{ new:true} )
         res.json(producto);


    }catch  (error) { 
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.obtenerProducto = async ( req, res) =>{
    try{

        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'no existe ese producto'})
        }

        
         res.json(producto);


    }catch  (error) { 
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

exports.eliminarProducto = async ( req, res) =>{
    try{

        let producto = await Producto.findById(req.params.id);

        if(!producto){
            res.status(404).json({msg: 'no existe ese producto'})
        }

        await Producto.findOneAndRemove({ _id: req.params.id})
        
         res.json({msg: 'producto eliminado con exito'});


    }catch  (error) { 
        console.log(error);
        res.status(500).send('hubo un error');
    }
}

