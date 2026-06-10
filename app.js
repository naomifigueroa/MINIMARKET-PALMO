const btnIA = document.getElementById("btnIA");
const resultadoIA = document.getElementById("resultadoIA");
const formCampana = document.getElementById("formCampana");
const historialCampanas = document.getElementById("historialCampanas");

let campañas = JSON.parse(localStorage.getItem("historialPalmo")) || [];

const ideas = [
  "Publicar un reel mostrando las ofertas del día con el mensaje: 'En PALMO, cada sol rinde más'.",
  "Crear una historia en Instagram con combos familiares de abarrotes, bebidas y limpieza.",
  "Lanzar una campaña de WhatsApp con promociones exclusivas para clientes frecuentes.",
  "Publicar un video corto mostrando a Doña Palma recomendando los productos más económicos.",
  "Crear una campaña de fin de semana con productos básicos a precios bajos.",
  "Publicar una foto de una clienta comprando y destacar la experiencia cercana de PALMO.",
  "Diseñar una promoción escolar con snacks, bebidas y productos para loncheras."
];

btnIA.addEventListener("click", function() {
  const ideaAleatoria = ideas[Math.floor(Math.random() * ideas.length)];
  resultadoIA.textContent = ideaAleatoria;
});

formCampana.addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = formCampana.querySelectorAll("input, select, textarea");

  const nuevaCampaña = {
    nombre: inputs[0].value,
    red: inputs[1].value,
    fecha: inputs[2].value,
    descripcion: inputs[3].value
  };

  campañas.push(nuevaCampaña);
  localStorage.setItem("historialPalmo", JSON.stringify(campañas));

  formCampana.reset();

  mostrarHistorial();
  actualizarKPI();

  alert("Campaña guardada correctamente para PALMO.");
});

function mostrarHistorial() {
  historialCampanas.innerHTML = "";

  campañas.forEach((campaña, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${campaña.nombre}</td>
      <td>${campaña.red}</td>
      <td>${campaña.fecha}</td>
      <td>${campaña.descripcion}</td>
      <td>
        <button class="btn-eliminar" onclick="eliminarCampaña(${index})">
          Eliminar
        </button>
      </td>
    `;

    historialCampanas.appendChild(fila);
  });
}

function eliminarCampaña(index) {
  campañas.splice(index, 1);
  localStorage.setItem("historialPalmo", JSON.stringify(campañas));

  mostrarHistorial();
  actualizarKPI();
}

function actualizarKPI() {
  const totalCampanas = campañas.length;

  document.getElementById("campanasKPI").textContent = totalCampanas;
  document.getElementById("alcanceKPI").textContent = totalCampanas * 500;
  document.getElementById("interaccionesKPI").textContent = totalCampanas * 120;
  document.getElementById("roiKPI").textContent = (totalCampanas * 15) + "%";
}

// CALENDARIO PALMO

const meses = [
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

let fechaActual = new Date();
let mes = fechaActual.getMonth();
let anio = fechaActual.getFullYear();

function renderCalendario(){

const calendario = document.getElementById("calendarioGrid");

if(!calendario) return;

calendario.innerHTML="";

document.getElementById("mesActual").textContent =
`${meses[mes]} ${anio}`;

const diasMes = new Date(anio, mes + 1, 0).getDate();

for(let i=1;i<=diasMes;i++){

const dia = document.createElement("div");

dia.classList.add("dia");

dia.innerHTML = `
${i}
<div class="dia-contenido"></div>
`;

dia.addEventListener("click",()=>{

let contenido = prompt(
`Escribe el contenido para el día ${i}:

Ejemplo:
Red social: Facebook
Título: Oferta del día
Objetivo: Aumentar ventas
KPI: Alcance e interacciones`
);

if(contenido){

dia.querySelector(".dia-contenido").textContent =
contenido;

}

});

calendario.appendChild(dia);

}

}

function mesAnterior(){

mes--;

if(mes<0){

mes=11;
anio--;

}

renderCalendario();

}

function mesSiguiente(){

mes++;

if(mes>11){

mes=0;
anio++;

}

renderCalendario();

}

mostrarHistorial();
actualizarKPI();
renderCalendario();
// CALENDARIO PALMO CON GUARDADO

const meses = [
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

let contenidosCalendario =
JSON.parse(localStorage.getItem("calendarioPalmo")) || {};

let fechaActual = new Date();
let mes = fechaActual.getMonth();
let anio = fechaActual.getFullYear();

function renderCalendario(){

const calendario = document.getElementById("calendarioGrid");
if(!calendario) return;

calendario.innerHTML = "";

document.getElementById("mesActual").textContent =
`${meses[mes]} ${anio}`;

const diasMes = new Date(anio, mes + 1, 0).getDate();

for(let i = 1; i <= diasMes; i++){

const fechaClave = `${anio}-${mes + 1}-${i}`;

const dia = document.createElement("div");
dia.classList.add("dia");

dia.innerHTML = `
${i}
<div class="dia-contenido">
${contenidosCalendario[fechaClave] || ""}
</div>
`;

dia.addEventListener("click",()=>{

let contenido = prompt(
`Escribe el contenido para el día ${i}:`,
contenidosCalendario[fechaClave] || ""
);

if(contenido !== null){

contenidosCalendario[fechaClave] = contenido;

localStorage.setItem(
"calendarioPalmo",
JSON.stringify(contenidosCalendario)
);

renderCalendario();

}

});

calendario.appendChild(dia);

}

}

function mesAnterior(){
mes--;
if(mes < 0){
mes = 11;
anio--;
}
renderCalendario();
}

function mesSiguiente(){
mes++;
if(mes > 11){
mes = 0;
anio++;
}
renderCalendario();
}

mostrarHistorial();
actualizarKPI();
renderCalendario();