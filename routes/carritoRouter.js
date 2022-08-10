const express = require("express");
const { Router } = require("express");
//declaro el router
const carts = Router();

//importo el controller
const Carts = require("../controllers/cartsController")

//estructura carrito
//id, timestamp, products[]

carts.post("/", (req, res) => {     
  const data = Carts.createCart()  
  res.status(201).json(data)   
});

carts.get("/", (req, res) => {     
  const data = Carts.getCarts()  
  res.status(201).json(data)   
});

carts.delete("/:id", (req, res) => {   
  let id = req.params.id  
  const data = Carts.deleteById(id)  
  res.json(data) 
});

carts.get("/:id/productos", (req, res) => {  
  let id = req.params.id    
  let data = Carts.getById(id)   
  res.status(201).json(data.products)
});

carts.post("/:id/productos/:idProducto", (req, res) => { 
  let idCarrito = req.params.id   
  let idProducto = req.params.idProducto  
  
  const data = Carts.addProduct(idCarrito, idProducto)
  res.status(201).json(data)   
});

carts.delete("/:id/productos/:idProducto", (req, res) => { 
  let idCarrito = req.params.id   
  let idProducto = req.params.idProducto   
  
  const data = Carts.deletProduct(idCarrito, idProducto)
  res.json(data)   
});

module.exports = carts;

