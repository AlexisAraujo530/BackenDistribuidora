import {loadProducts} from "./productos.js";
import {loadCarrito} from "./cart.js";

//Formulario de Carga de Producto
export const renderForm = () => { 

  const formulary = document.createElement("div");
  formulary.className = "formulario col-12 row";

  const form = document.createElement("form");
  form.className = "form col-6";


  const legend = document.createElement("legend");
  legend.innerHTML = "Agregar Producto";

  const name = document.createElement("input");
  name.type = "text";
  name.name = "name";
  name.id = "nombre";
  name.placeholder = "Nombre del Producto";
  name.required = true;

  const description = document.createElement("input");
  description.type = "text";
  description.name = "description";
  description.id = "descripcion";
  description.placeholder = "Descripcion del Producto";
  description.required = true;

  const code = document.createElement("input");
  code.type = "text";
  code.name = "code";
  code.id = "codigo";
  code.placeholder = "Codigo del Producto";
  code.required = true;

  const thumbnail = document.createElement("input");
  thumbnail.type = "text";
  thumbnail.name = "thumbnail";
  thumbnail.id = "thumbnail";
  thumbnail.placeholder = "URL de la Imagen";
  thumbnail.required = true;

  const price = document.createElement("input");
  price.type = "text";
  price.name = "price";
  price.id = "precio";
  price.placeholder = "Precio del Producto";
  price.required = true;

  const stock = document.createElement("input");
  stock.type = "text";
  stock.name = "stock";
  stock.id = "stock";
  stock.placeholder = "Stock del Producto";
  stock.required = true;

  const formButton = document.createElement("div");
  formButton.className = "form-button";
  
  const btnSubmit = document.createElement("input");  

  btnSubmit.value = "Agregar Producto";
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    } );    
    createProduct(data); 
  } );

  formButton.append(btnSubmit);

  const btnReturn = document.createElement("button");
  btnReturn.className = "btnReturn";
  btnReturn.innerHTML = "CANCELAR";
  btnReturn.addEventListener("click", () => {loadProducts(), loadCarrito()}); 

  form.append(legend, name, description, code, thumbnail, price, stock, formButton, btnReturn);  

  formulary.append(form);
  formulario.append(formulary);  
  productsContainer.innerHTML = ""; 
  carritosContainer.innerHTML = ""; 

}  

//Funcion para crear producto
const createProduct = (data) => {
  const url = "/api/productos";  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)    
  })
    .then((res) => res.json())
    .then((data) => { 
      Swal.fire(
        'Producto creado con exito!',
      );     
      loadProducts();
      loadCarrito();
    } );
}