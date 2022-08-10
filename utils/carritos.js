const productos = require("./productos");

const carts = [];
let id = 0;

//funcion que crea un carrito
const create = () => {
  id ++ 
  let timestamp = new Date().getTime();
  carts.push({id : id, timestamp: timestamp , products : []}) 
  return id
} 

//funcion que devuelve todos los carritos
const getAll = () => {
  return carts;
} 

//funcion que elimina un carrtio segun id
const deleteById = (i) => {    
  let index = carts.findIndex(x => x.id == i) 
  if (index == -1) {
    return ({ error: 'Carrito no encontrado' })
  }  
  carts.splice(index, 1);
  return "Carrito Eliminado"  
}

//funcion que muestra el contenido de un carrito segun su ID
const getById = (x) => {    
  if (carts.length === 0) {return ({"Error" : "No hay Carritos"})} 
  return (carts.find(el => el.id == x) || { error: 'Carrito no encontrado' })  
}  

//funcion para agregar porducto segun ID a un carrito segun su ID
const addProduct = (idCarrito, idProducto) => {    
  if (carts.length === 0) {return ({"Error" : "No hay Carritos"})} 

  let indexCart = carts.findIndex(el => el.id == idCarrito)
  if (indexCart == -1) {
    return ({ error: 'Carrito no encontrado' })
  } 

  const products = productos.list()
  let indexProduct = products.findIndex(el => el.id == idProducto)
  if (indexProduct == -1) {
    return ({ error: 'Producto no encontrado' })
  } 

  carts[indexCart].products.push(products[indexProduct])
  return "Producto Agregado"
   
}  

//funcion para eliminar porducto segun ID a un carrito segun su ID
const deletProduct = (idCarrito, idProducto) => {    
  if (carts.length === 0) {return ({"Error" : "No hay Carritos"})} 

  let indexCart = carts.findIndex(el => el.id == idCarrito)
  if (indexCart == -1) {
    return ({ error: 'Carrito no encontrado' })
  } 

  const productos = carts[indexCart].products;
  let indexProduct = productos.findIndex(el => el.id == idProducto)
  if (indexProduct == -1) {
    return ({ error: 'Producto no encontrado' })
  } 

  carts[indexCart].products.splice(indexProduct, 1);  
  return "Producto Eliminado"
   
}  


module.exports = { create, getAll, getById, deleteById, addProduct, deletProduct };