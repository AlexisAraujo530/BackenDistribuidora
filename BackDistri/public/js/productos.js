import {renderForm} from "./formulario.js";
import {toEdit} from "./editProduct.js";
import { loadCarrito } from "./cart.js";

const productsContainer = document.getElementById("productsContainer");
const formulario = document.getElementById("formulario");
const produtcToEdit = document.getElementById("produtcToEdit");

//funcion para renderizar productos
const renderProducts = (arr) => {  

  if (arr.length === 0) {    
    const h2 = document.createElement("h2");
    h2.className = "noProducts col-12";
    h2.append("No se registran productos");    
    productsContainer.appendChild(h2);
  } else {
    for (const el of arr) {
      const productContainer = document.createElement("div");
      productContainer.className = "productContainer col-12 col-md-3";      

      const productImage = document.createElement("div");
      productImage.className = "productImage";
      productImage.innerHTML = `<img src="${el.thumbnail}" alt="product image" class="productImage">`;

      const productInfo = document.createElement("div");
      productInfo.className = "productInfo";
      productInfo.className = "productInfo";

      const productName = document.createElement("h2");
      productName.innerHTML = el.name.toUpperCase();

      const productDescription = document.createElement("p");
      productDescription.innerHTML = `Descripcion: ${el.description}`;

      const productCode = document.createElement("p");
      productCode.innerHTML = `Codigo: ${el.code}`;

      const productPrice = document.createElement("p");
      productPrice.innerHTML = `Precio: $${el.price}`;

      const productStock = document.createElement("p");
      productStock.innerHTML = `Stock: ${el.stock}`;

      const productId = document.createElement("p");
      productId.innerHTML = `Id: ${el.id}`;

      const productBtns = document.createElement("div");
      productBtns.className = "productBtns";
      const btnEdit = document.createElement("button");
      btnEdit.className = "editBtn";
      btnEdit.innerHTML = "EDITAR";
      btnEdit.addEventListener("click", () => toEdit(el.id));

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "p-1 deleteBtn";
      deleteBtn.innerHTML = "ELIMINAR";
      deleteBtn.addEventListener("click", () => deleteProduct(el.id));

      productBtns.append(btnEdit, deleteBtn);

      productInfo.append(productName, productDescription, productCode, productPrice, productStock, productId, productBtns);

      const addToCart = document.createElement("div");
      addToCart.className = "addToCart text-center";
      const btnAdd = document.createElement("button");
      btnAdd.className = "addBtn";
      btnAdd.innerHTML = "AGREGAR A CARRITO";
      btnAdd.addEventListener("click", () => addProductToCart(el.id));

      addToCart.append(btnAdd);

      productContainer.append(productImage, productInfo, addToCart);     

      productsContainer.append(productContainer);

    }
  }
   
  const btnContainer = document.createElement("div");
  btnContainer.className = "col-12 text-center justify-content-center align-items-center";
  const formulario = document.createElement("button");
  formulario.className = "toFormuBtn col-12 col-md-3";
  formulario.innerHTML = "IR A FORMULARIO DE CARGA";
  formulario.addEventListener("click", () => {
    renderForm();    
  });
  btnContainer.append(formulario);
  productsContainer.append(btnContainer);

}

export const loadProducts = () => {  
  productsContainer.innerHTML = "";
  formulario.innerHTML = "";
  produtcToEdit.innerHTML = "";
  fetch('/api/productos')
  .then(response => response.json())
  .then(data => renderProducts(data));
}


//funcion para agregar producto al carrito
 function addProductToCart(idEl) {
  fetch('/api/carrito')
  .then(response => response.json())
  .then(data => reRederCart(data, idEl));  
} 

const reRederCart = (arr, idEl) => {
  if (arr.length === 0) {
    Swal.fire({
      icon: 'error',
      text: 'No hay productos en el carrito',
    });
  }else {
    const idCart = arr[arr.length - 1].id;
    const idProduct = idEl;	
    const url = `/api/carrito/${idCart}/productos/${idProduct}`;
    fetch(url, {
      method: "POST"
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire(data);
      loadCarrito();
    }).catch(err => console.log(err));
  }       
  
}

//funcion para eliminar producto
const deleteProduct = (idEl) => {
  const url = `/api/productos/${idEl}`;
  fetch(url, {
    method: "DELETE"
  }).then(response => response.json())
  .then(data => {
    Swal.fire(data);
    loadProducts();
  }).catch(err => console.log(err));
}