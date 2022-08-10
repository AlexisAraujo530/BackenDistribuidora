const carritosContainer = document.getElementById("carritosContainer");

//funcion para renerizar carrito
const renderCarritos = (arr) => {
  carritosContainer.innerHTML = "";
  if (arr.length === 0) {
    const noCarrito = document.createElement("h2");
    noCarrito.className = "noProducts col-12";
    noCarrito.append("NO HAY CARRITO CREADO");

    const createCartBtn = document.createElement("form");    
    createCartBtn.className = "col-12 row";

    const divCreate = document.createElement("div");
    divCreate.className = "text-center";

    const createSubmit = document.createElement("input");    
    createSubmit.value = "CREAR CARRITO";
    createSubmit.className = "crateCartBtn text-center";
    createSubmit.addEventListener("click", () => createCarrito());

    divCreate.append(createSubmit);
    createCartBtn.append(divCreate);

    carritosContainer.append(noCarrito, createCartBtn);
  } else {
    const data = arr[arr.length-1];
    if (data.products.length === 0) {
      const noProducts = document.createElement("h2");
      noProducts.className = "noProducts col-12";
      noProducts.append("No hay productos en el carrito");
      carritosContainer.append(noProducts);
    } else {
      const cartTitle = document.createElement("h2");
      cartTitle.className = "col-12";
      cartTitle.append(`CARRITO ${data.id}`);

      const div1 = document.createElement("div");
      div1.className = "col-12";

      const div2 = document.createElement("div"); 
      div2.className = "col-12";

      const h3 = document.createElement("h3");      
      h3.append("PRODUCTOS");

      const table = document.createElement("table");
      table.className = "table table-striped col-12";
      
      const thead = document.createElement("thead");

      const tr = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.scope = "col";      
      th1.innerHTML = "NOMBRE";

      /* const th2 = document.createElement("th");
      th2.scope = "col";
      th2.innerHTML = "DESCRIPCION"; */

      /* const th3 = document.createElement("th");
      th3.scope = "col";
      th3.innerHTML = "CODIGO"; */

      const th4 = document.createElement("th");
      th4.scope = "col";
      th4.innerHTML = "PRECIO";

      /* const th5 = document.createElement("th");
      th5.scope = "col";
      th5.innerHTML = "STOCK"; */
      /*
      const th6 = document.createElement("th");
      th6.scope = "col";
      th6.innerHTML = "ID";
      */
      const th7 = document.createElement("th");
      th7.scope = "col";
      th7.innerHTML = "ELIMINAR";

      tr.append(th1, th4, th7);
      thead.append(tr); 
      table.append(thead);
      div2.append(h3, table);
      div1.append(div2);
      carritosContainer.append(cartTitle, div1);

      const tbody = document.createElement("tbody");

      for (let i = 0; i < data.products.length; i++) {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.innerHTML = data.products[i].name;

        const td2 = document.createElement("td");
        td2.innerHTML = data.products[i].price;
        /*
        const td3 = document.createElement("td");
        td3.innerHTML = data.products[i].id;
        */
        const td4 = document.createElement("td");
        td4.className = "deleteFromCart";
        td4.innerHTML = "X";
        td4.addEventListener("click", () => {
          deleteFromCart(data.id, data.products[i].id);
        } );

        tr.append(td1, td2, td4);

        tbody.append(tr);
        
      }

      table.append(tbody);

      const createCartBtn = document.createElement("form");  
      createCartBtn.className = "col-12 row";

      const divCreate = document.createElement("div");
      divCreate.className = "text-center";

      const createSubmit = document.createElement("input");  
      createSubmit.value = "REINICIAR CARRITO";
      createSubmit.className = "crateCartBtn text-center";
      createSubmit.addEventListener("click", () => {
        restartCarrito();
      } );

      divCreate.append(createSubmit);
      createCartBtn.append(divCreate);

      carritosContainer.append(createCartBtn);

      
    }
  }  

}

//funcion para eliminar producto del carrito
const deleteFromCart = (cartId, productId) => {
  const url = `/api/carrito/${cartId}/productos/${productId}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire(data);
      loadCarrito();
    } );  
}

export const loadCarrito = () => { 
  fetch('/api/carrito')
  .then(response => response.json())
  .then(data => renderCarritos(data));    
}

//funcion para crear carrito
const createCarrito = () => {
  const url = "/api/carrito";
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      swet.alert("Carrito Creado");
      loadCarrito();
    } );  
}

//funcion para reiniciar carrito
const restartCarrito = () => {
  const url = "/api/carrito";
  fetch(url, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire("Carrito reiniciado!");
      loadCarrito();
    } );  
}






