//importo las funciones de productos.js
const productos = require("../utils/productos");

//Declaro el controller 
class Products { 
  
  static getAll() {
    const allProducts = productos.list()
    return allProducts
  }

  static save(object) {
    const idProduct = productos.save(object);
    return idProduct
  }
  
  static getById (x) {    
    const data = productos.getById(x);
    return data;
  }  
  
  static deleteById (x) {
    const data = productos.deleteById(x);
    return data;
  } 

  static changeById (x, object) {
    const data = productos.changeById(x, object);
    return data;
  }     

} 

module.exports = Products;