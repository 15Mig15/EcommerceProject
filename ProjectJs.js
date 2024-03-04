

//PLANTILLA PARA CREAR PRODUCTOS
class Producto {
    constructor(imagen,nombre,precio,id){
      this.imagen = imagen;
      this.nombre = nombre;
      this.precio = precio;
      this.id = id;
      this.cantidad = 1;
    }
  }
//DEFINIMOS CADA PRODUCTO
  const camara = new Producto("📸","Camara",200,1)
  const televisor = new Producto("📺","Televisor",300,2)
  const laptop = new Producto("💻","Laptop",320,3)
  const impresora = new Producto("🖨️","Impresora",250,4)
  const computadora = new Producto("🖥️","Computadora",350,5)
  const celular = new Producto("📱","Celular",200,6)
  const telefono = new Producto("☎️","Telefono",150,7)
  const audifonos = new Producto("🎧","Audifonos",120,15)
  const grabadora = new Producto("📹","Grabadora",200,8)
  const reloj = new Producto("⌚","Reloj",100,9)
  const disquete = new Producto("💾","Disquete",60,10)
  const mouse = new Producto("🖱️","Mouse",60,11)
  const microfono = new Producto("🎙️","Microfono",70,12)
  const disco_duro = new Producto("💽","Disco Duro",70,13)
  const joystick = new Producto("🕹️","Joystick",100,14)
  


  const ArrayProductos = [camara,televisor,laptop,impresora,computadora,telefono,audifonos,grabadora,reloj,disquete,mouse,microfono,disco_duro,joystick]
  let Carrito = []
  let total = 0
//SI HAY ALGO EN EL LOCALSTORAGE LO CARGAMOS EN EL CARRITO
  if(localStorage.getItem("carrito"))
  Carrito = JSON.parse(localStorage.getItem("carrito"))

//ELEMENTOS DEL DOM
  const contenedorProductos = document.querySelector(".contenedor")
  const botonCarrito = document.querySelector("img.carrito")
  const contenedorCarrito = document.getElementById("contenedorEnCarrito")
  const dialogCarrito = document.querySelector("dialog")
  const carritoTotal = document.querySelector(".carritoTotal")
  const inputBuscador = document.querySelector("input[type=search]")


  function mensajeToast(mensaje) {
    Toastify({
      text: `${mensaje}`,     
      duration: 2500,
      close: true,
      gravity: "bottom", 
      position: "center",         
    }).showToast();
}

function mensajeSweet(mensaje){
  Swal.fire({
    position: "center",
    icon: "info",
    iconColor: "Red",
    title: `${mensaje}`,
    showConfirmButton: false,
    timer: 1500
  });
}
  
  
//LISTAMOS CADA UNO DE LOS PRODUCTOS EN EL NAVEGADOR
function MostrarProductos(array){
    contenedorProductos.innerHTML = ""
    array.forEach(prod => {
      contenedorProductos.innerHTML += `
                    <div class="cardProducto" id="cardProducto">
                        <div><h1>${prod.imagen}</h1></div>
                        <div class="cardNombre"><p>${prod.nombre}</p></div>
                        <div class="cardPrecio"><p>$ ${prod.precio}</p></div>
                        <button data-id="${prod.id}" class="btn-add-carr">AGREGAR</button>
                    </div>`
    })
    botonesClick()
}


//ACTIVAMOS EL CLICK EN LOS BOTONES
//CONSULTAMOS SI EL PRODUCTO YA SE ENCUENTRA EN EL CARRITO, SI ES VERDADERO AUMENTAMOS LA CANTIDAD,
  //SI ES FALSO LO AGREGAMOS COMO NUEVO
//EL PRODUCTO SELECCIONADO LO AGREGAMOS AL CARRITO  
function botonesClick(){
      let botonAgregarCarrito = document.querySelectorAll(".btn-add-carr")
      botonAgregarCarrito = [...botonAgregarCarrito]

      botonAgregarCarrito.forEach(boton => {
        boton.addEventListener("click", () => {
          let botonID = parseInt(boton.dataset.id)
          let productoEnCarrito = Carrito.find(prod => prod.id === botonID)
          if(productoEnCarrito){
            productoEnCarrito.cantidad++
            mensajeToast(`El producto ${productoEnCarrito.imagen} se ha agregado al carrito`)
          }else{
            let productoSeleccionado = ArrayProductos.find(prod => prod.id === botonID)
            mensajeToast(`El producto ${productoSeleccionado.imagen} se ha agregado al carrito`)
            Carrito.push(productoSeleccionado)
            //LocalStorage
            localStorage.setItem("carrito", JSON.stringify(Carrito))
          }
          console.log(Carrito)
          mostrarCarrito()
          totalEnCarrito()
     })})
    }
     

//MOSTRAMOS EL CARRITO CON LOS PRODUCTOS
      function mostrarCarrito(){
        contenedorCarrito.innerHTML = ""
       Carrito.forEach(prod => contenedorCarrito.innerHTML += `
                     <div class="cardProductoC" id="CardProductoC">
                           <div><h1>${prod.imagen}</h1></div>
                           <div class="cardNombre"><p>${prod.nombre}</p></div>
                           <div class="cardPrecio"><p>$ ${prod.precio}</p></div>
                           <input class="cardCantidad" min="1" type="number" id="${prod.id}"  value="${prod.cantidad}"> :Cantidad</input>
                           <button data-id="${prod.id}" class="btn-close-carr">Eliminar</button>
                     </div>`
       )
         aumentarNumeroItems()
         EliminarItemCarrito()
         
      }


     
//ABRIMOS LA VENTANA DEL CARRITO

      botonCarrito.addEventListener("click",()=>{
        Carrito.length > 0 ? mostrarCarrito() : contenedorCarrito.innerText = "EL CARRITO ESTÁ VACIO"
        dialogCarrito.showModal()
      })
//CERRAMOS LA VENTANA DEL CARRITO
      botonCerrarCarrito = document.querySelector("button.btnCerrarCarrito")
      botonCerrarCarrito.addEventListener("click",()=>{
        dialogCarrito.close()
      })


// ELIMINAMOS POR COMPLETO UN ITEM DEL CARRITO
      function EliminarItemCarrito(){
        let removerItemCarrito = document.querySelectorAll(".btn-close-carr")
        removerItemCarrito = [...removerItemCarrito]
        removerItemCarrito.forEach(boton => {
          boton.addEventListener("click",()=>{
            let btnIDRemover = parseInt(boton.dataset.id)
            let producto = Carrito.find(prod => prod.id === btnIDRemover)
            indice = Carrito.indexOf(producto)
            Carrito.splice(indice,1)
            mostrarCarrito()
            totalEnCarrito()
            //localStorage
            localStorage.setItem("carrito",JSON.stringify(Carrito))
          })
        })
      }
// VACIAMOS EL CARRITO
       let botonVaciarCarrito = document.querySelector(".btnVaciarCarrito")
       botonVaciarCarrito.addEventListener("click", ()=>{
        vaciarCarrito()
        // mensajeToast(`El Carrito se ha vaciado!!`)
        mensajeSweet("El Carrito está vacio!!!")
       })
        function vaciarCarrito(){
         Carrito = []
         mostrarCarrito()
         totalEnCarrito()
        }

// MODIFICAMOS LA CANTIDAD DE CADA ITEM DENTRO DEL CARRITO
      function aumentarNumeroItems(){
        let inputNumber = document.querySelectorAll(".cardCantidad")
        inputNumber = [...inputNumber]
        inputNumber.forEach(input => {
          input.addEventListener("click",()=>{
            indice = Carrito.findIndex((prod)=> prod.id === parseInt(input.id))
            Carrito[indice].cantidad = parseInt(input.value)
            totalEnCarrito()
          })
        })
          }
        
// IMPRIMIMOS EN EL CARRITO EL TOTAL DE PRECIO DE LOS PRODUCTOS SELECCIONADOS
       function totalEnCarrito(){
        let sumaTotal
        let total = Carrito.reduce((sum,item) => {
          sumaTotal = sum + item.cantidad*item.precio
          return sumaTotal
        },0)
        carritoTotal.innerText = `TOTAL: $${total}`
      }
   
inputBuscador.addEventListener("search", ()=>{
  let textoIngresado = inputBuscador.value.trim().toUpperCase()
  let ResultadoBusqueda = ArrayProductos.filter(prod => prod.nombre.toUpperCase().includes(textoIngresado))
  MostrarProductos(ResultadoBusqueda)
})


MostrarProductos(ArrayProductos)
  
