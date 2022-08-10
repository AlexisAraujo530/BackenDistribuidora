const express = require("express");
const { Router } = require("express");
//declaro el router
const products = Router();

//importo los controllers
const Products = require("../controllers/productsController")
const Admin = require("../controllers/adminController")

//estructura Productos
//id, timestamp, nombre, descripcion, código, thumbnail, precio, stock.
//id, timestamp, name, description, code, thumbnail, price, stock
/* {    
    "name":"teclado",
    "description":"Teclado para PC",
    "code": "50E55",
    "thumbnail":"alguna url",
    "price":500,
    "stock":50
} */


products.get("/", (req, res) => {
  const productos = Products.getAll()
  res.status(200).json(productos);
});

products.get("/:id", (req, res) => {  
  let id = req.params.id    
  let data = Products.getById(id)   
  res.status(201).json(data)
});

products.post("/", (req, res) => { 
  let login = Admin.isLogin()
  if (login) {
    const {name, description, code, thumbnail, price, stock} = req.body
    const data = Products.save({name, description, code, thumbnail, price, stock})  
    res.status(201).json(data) 
  } else {
    res.json({ error : -1, descripcion: "ruta '/' método 'POST' no autorizada" })
  }
});

products.delete("/:id", (req, res) => { 
  let login = Admin.isLogin()
  if (login) {
    let id = req.params.id  
    const data = Products.deleteById(id)  
    res.json(data) 
  } else {
    res.json({ error : -1, descripcion: `ruta '/${id}' método 'DELETE' no autorizada` })
  }
});

products.put("/:id", (req, res) => {
  let login = Admin.isLogin()
  if (login) {
    let id = parseInt(req.params.id)
    const {name, description, code, thumbnail, price, stock} = req.body
    const data = Products.changeById(id, {name, description, code, thumbnail, price, stock})  
    res.json(data) 
  } else {
    res.json({ error : -1, descripcion: `ruta '/${id}' método 'PUT' no autorizada` })
  } 
});

module.exports = products;