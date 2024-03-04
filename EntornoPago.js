//  import { totalEnCarrito } from './ProjectJs.js' 

const inputname = document.querySelector("#input-name")
const inputnumero = document.querySelector("#input-numero")
const inputmes = document.querySelector("#input-mes")
const inputaño = document.querySelector("#input-año")
const cardnombre = document.querySelector("#card-nombre")
const cardnumero = document.querySelector("#card-numero")
const cardaño = document.querySelector("#card-año")
const cardmes = document.querySelector("#card-mes")
const form = document.querySelector("#form")
const botonContinuar = document.querySelector(".button-card") 
const totalCompra = document.querySelector("#total_compra")
const icono_tarjeta = document.querySelector("#icon-card")
const main = document.querySelector("main")
const X = document.querySelector("#close")

inputname.addEventListener("input",()=>{
    cardnombre.innerText = inputname.value

    if (inputname.value.length === 0) {
        cardnombre.innerText = "Miguel Mendez";
    }
})

inputnumero.addEventListener("input", () => {
    cardnumero.innerText = inputnumero.value;

    if (inputnumero.value.length === 0) {
        cardnumero.innerText = "0000 0000 0000 0000";
    }
})

inputmes.addEventListener("input", () => {
    cardmes.innerText = inputmes.value;

    if (inputmes.value.length === 0) {
        cardmes.innerText = "00";
    }
})

inputaño.addEventListener("input", () => {
    cardaño.innerText = inputaño.value;

    if (inputaño.value.length === 0) {
        cardaño.innerText = "00";
    }
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})


icono_tarjeta.addEventListener("click",()=>{
    main.classList.remove("desactivar")
    // totalCompra.innerHTML = `Total: ${totalEnCarrito}`
})

X.addEventListener("click",()=>{
    main.classList.add("desactivar")
})

botonContinuar.addEventListener("click",()=>{
    form.reset()
    cardnombre.innerText = "Miguel";
    cardnumero.innerText = "0000 0000 0000 0000";
    cardmes.innerText = "00";
    cardaño.innerText = "00";
}) 


