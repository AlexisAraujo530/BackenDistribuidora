import {loadProducts} from "./productos.js";
import {loadCarrito} from "./cart.js";

const produtcToEdit = document.getElementById("produtcToEdit");
const carritosContainer = document.getElementById("carritosContainer");

//FORMULARIO DE EDICION DE PRODUCTO 
const renderProductToEdit = (obj) => {
  
  const formulario = document.createElement("div");
  formulario.className = "formulario col-12 row";

  const form = document.createElement("form");
  form.className = "form col-6";
  /* form.action = `/api/productos/${obj.id}?_method=PUT`;
  form.method = "POST"; */

  const legend = document.createElement("legend");
  legend.innerHTML = "EDITAR PRODUCTO";

  const name = document.createElement("input");
  name.type = "text";
  name.name = "name";
  name.id = "nombre";
  name.placeholder = "Nombre de Producto";
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

  const submit = document.createElement("input");
  /* submit.type = "submit"; */  
  submit.value = "EDITAR";
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    } );
    editProduct(data, obj.id);
  } );

  formButton.append(submit);

  const btnReturn = document.createElement("button");
  btnReturn.className = "btnReturn";
  btnReturn.innerHTML = "CANCELAR";
  btnReturn.addEventListener("click", () => {loadProducts(), loadCarrito()}); 

  form.append(legend, name, description, code, thumbnail, price, stock, formButton, btnReturn);

  formulario.append(form);

  produtcToEdit.append(formulario);

}

//funcion para editar producto
const editProduct = (data, id) => {
  const url = `/api/productos/${id}`;
  const method = "PUT";
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(data);
  fetch(url, {method, headers, body})
    .then(res => res.json())
    .then(res => {    
        Swal.fire("Producto editado correctamente!");  
        loadProducts();
        loadCarrito();      
    } )
    .catch(err => console.log(err));
}

export const toEdit= (id) => {
  productsContainer.innerHTML = "";
  carritosContainer.innerHTML = "";

  console.log(id);
  fetch(`/api/productos/${id}`)
  .then(response => response.json())
  .then(data => renderProductToEdit(data));
}

