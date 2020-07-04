//guardarLS();
let arrayClaves=new Array();
let arrayFechas=new Array();
fechaHoy();
leerLS();


var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {


  arrayClaves.forEach((item, i) => {
var countDownDate = new Date(arrayFechas[i]).getTime();

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

// escribe el countdown de la tarea
  document.getElementById(item+"_D").innerHTML=days + "</br>D";
  document.getElementById(item+"_H").innerHTML=hours + "</br>H";
  document.getElementById(item+"_M").innerHTML=minutes + "</br>M";
  document.getElementById(item+"_S").innerHTML=seconds + "</br>S";

  // If the count down is finished, write some text
  if (distance < 0) {
    document.getElementById(item+"_D").innerHTML= "EX</br>D";
    document.getElementById(item+"_H").innerHTML="PI</br>H";
    document.getElementById(item+"_M").innerHTML="RA</br>M";
    document.getElementById(item+"_S").innerHTML="DA</br>S";
  }

  });//fin del bucle de recorrer arrays

}, 1000);

function guardarLS(){
  var nuevoId= parseInt(document.getElementById("totalTareasCreadas").value);
  nuevoId+=1;
  document.getElementById("totalTareasCreadas").value=nuevoId;
  nuevoId= "tarea"+nuevoId;

  // definicion objeto tarea en localStorage
  let tarea={
      descricion:"",
      nivel:"",
      fecha:""
  };

  tarea.descricion=document.getElementById('descNuevaTarea').value;
  tarea.nivel=document.getElementById('prioridadMarcada').value;
  tarea.fecha=document.getElementById('fechaLimite').value;
  // Crea nueva tarea en localStorage
  localStorage.setItem(nuevoId,JSON.stringify(tarea));

  // Añade una nueva Div a Tareas en pantalla
  creaDIV(nuevoId,tarea.descricion,tarea.fecha,tarea.nivel);
  //Quito la div que avisa que no hay tareas
  document.getElementById('sinTareas').classList.add('oculto');
}

// lee de localStorage pero solo las claves que empiezen por "tarea",
// que son las claves que crea esta practica
function leerLS(){
 let idMasAltoTareasAlmacenadas=0; //Variable para saber cuantar tareas hay creadas

  for (i=0; i<localStorage.length; i++){
    let laClave=localStorage.key(i);
    console.log(laClave.substr(0,5));
    if(laClave.substr(0,5)=="tarea"){ //Solo las claves que empiecen por "tarea"
      document.getElementById('sinTareas').classList.add('oculto');

      let longi=laClave.length;
      longi=longi-5;

    //  console.log("tarea--"+laClave.substr(5,longi));
      if(idMasAltoTareasAlmacenadas < parseInt(laClave.substr(5,longi))){
        idMasAltoTareasAlmacenadas = parseInt(laClave.substr(5,longi));
      }

      //Divide el objeto localStorage en campos
      let unaTarea=JSON.parse(localStorage.getItem(localStorage.key(i)));

      //creaDIV(parametros) añade una div con la tarea leida
      creaDIV(laClave,unaTarea.descricion,unaTarea.fecha,unaTarea.nivel);
    }
  }
  //Campo oculto que me dice el id numerico mas alto que tengo en LocalStorage
  document.getElementById("totalTareasCreadas").value = idMasAltoTareasAlmacenadas;
}

//Evento para desplegar con JQuery la div que tiene los campos para crear una
// nueva tarea
const clicDesplegar= document.getElementById('cabForm__abrir');
clicDesplegar.addEventListener('click',(e)=>{
  $('#cabForm__campos').slideToggle();
})

//Evento para guardar los campos para crear una nueva tarea localStorage
const clicGuardar= document.getElementById('btn_Guardar');
clicGuardar.addEventListener('click',(e)=>{
  let algoEnDescripcion=false;
  let algunaPrioridad=false;
  let fechaMayorIgual=false;
  let sePuedeGuardar=false;

  if(document.getElementById('descNuevaTarea').value===""){
    //alert("No ha puesto DESCRIPCIÓN de la tarea");
  }else{
    algoEnDescripcion=true;
  }
  // Comprueba si hay algun cuadro de colores que tenga la clase "prioridadSeleccionada"
  var elementosPrioridad = document.getElementsByClassName("prioridadSeleccionada");
  if(elementosPrioridad.length==0){
  //  alert("No ha seleccionado PRIORIDAD de la tarea");
  }else{
    algunaPrioridad=true;
  }


  let fechaTarea = new Date(document.getElementById('fechaLimite').value);
  let fechaHoy = new Date();
  let resta = fechaHoy.getTime() - fechaTarea.getTime();
//  console.log("fechaTarea:"+document.getElementById('fechaLimite').value);
//  console.log("fechaTarea:"+fechaTarea+"  fechaHoy:"+fechaHoy+"  resta:"+resta);
  if(fechaTarea<fechaHoy){
    //alert("Fecha limite tiene que ser MAYOR a fecha actual.");
  }else{
    fechaMayorIgual=true;
  }
  let cadenaAviso="";
  if(!algoEnDescripcion){
    cadenaAviso="No ha puesto DESCRIPCIÓN de la tarea.\n"
  }
  if(!algunaPrioridad){
    cadenaAviso+="No ha seleccionado PRIORIDAD de la tarea.\n"
  }
  if(!fechaMayorIgual){
    cadenaAviso+="Fecha limite tiene que ser MAYOR a fecha actual."
  }

  if(algoEnDescripcion && algunaPrioridad && fechaMayorIgual){
     guardarLS();
  }else{
    alert(cadenaAviso);
  }
})

//Evento para controlar el click en os cuadros de colores
var elementosPrioridad = document.getElementsByClassName("prioridad");
var clickEnPrioridad = function() {
  //quita la clase "prioridadSeleccionada"a los cuadrados de colores;
  document.getElementById('cuadroVerde').classList.remove('prioridadSeleccionada');
  document.getElementById('cuadroAmarillo').classList.remove('prioridadSeleccionada');
  document.getElementById('cuadroRojo').classList.remove('prioridadSeleccionada');

  var atributo = this.getAttribute("data-color");
  this.classList.add('prioridadSeleccionada');
  document.getElementById("prioridadMarcada").value=atributo;
  //alert("pulso en "+atributo);
}

for(var a = 0; a < elementosPrioridad.length; a++ ){
  elementosPrioridad[a].addEventListener('click',clickEnPrioridad,false);
}

// Funcion que inserta una nueva DIV en Pantalla.
function creaDIV(nomClave,descTarea,fechaTarea,nivelTarea){
  var nuevaDiv = document.createElement("DIV");
  var nuevoId = nomClave;
  var fechaFormateada=fechaTarea.substr(8,2)+"/"+fechaTarea.substr(5,2)+"/"+fechaTarea.substr(0,4)+" 23:59:59";  
  var fechaFormateada=fechaTarea.substr(8,2)+"/"+fechaTarea.substr(5,2)+"/"+fechaTarea.substr(0,4)+" "+fechaTarea.substr(11,2)+":"+fechaTarea.substr(14,2)+":00";
  //var fechaFormateada=fechaTarea;

  nuevaDiv.setAttribute('class', 'unaTarea radius5 '+ nivelTarea);
  nuevaDiv.setAttribute('id', nuevoId);                    // Create a <p> node
  var textoNuevaDiv = document.createTextNode("");      // Create a text node
  nuevaDiv.appendChild(textoNuevaDiv);                                          // Append the text to <p>
  document.getElementById("tareasProgramadas").appendChild(nuevaDiv);
  let elInner="<div class='tareaDesc'>"+descTarea+"   Fecha Fin ("+fechaFormateada+")</div>";
  elInner+="<div class='countdown' id='"+nuevoId+"_D'>999</br>D</div>";
  elInner+="<div class='countdown' id='"+nuevoId+"_H'>24</br>H</div>";
  elInner+="<div class='countdown' id='"+nuevoId+"_M'>47</br>M</div>";
  elInner+="<div class='countdown' id='"+nuevoId+"_S'>55</br>S</div>";
  elInner+="<span id='borrar-"+nuevoId+"' class='borrar icon-trash' data-cual='"+nuevoId+"'></span>";
  document.getElementById(nuevoId).innerHTML = elInner;
  //Guardo en 2 arrays las claves y las fechas para los contadores.regresivos
  arrayClaves[arrayClaves.length]=nuevoId;
  arrayFechas[arrayFechas.length]=fechaTarea;

  arrayClaves.forEach((item, i) => {
    console.log(i+"--"+item+"--"+arrayFechas[i]);
  });
  crearEventoBotonBorrar(nuevoId);
}
function crearEventoBotonBorrar(nuevoId){
  elId="borrar-"+nuevoId;
  console.log(elId);
  //Evento para guardar los campos para crear una nueva tarea localStorage
  const clicBorrar= document.getElementById(elId);
  clicBorrar.addEventListener('click',(e)=>{

    var atributoBorr = nuevoId;
    //alert('borrar localStorage:'+atributoBorr);
    localStorage.removeItem(atributoBorr);
    document.getElementById(atributoBorr).classList.add('oculto');

    //busco el indice que tiene el elemento a clicBorrar
    //en las arrays para quitarlos de las arrays
    let indiceABorra;
    arrayClaves.forEach((item, i) => {
    //  console.log(i+"--"+item);
      if(item==nuevoId){
         indiceABorrar=i;
      }
    });
    arrayClaves.splice(indiceABorrar,1);
    arrayFechas.splice(indiceABorrar,1);


    arrayClaves.forEach((item, i) => {
      console.log(i+"--"+item+"--"+arrayFechas[i]);
    });

    //compueba si quedan tareas en localStorage para Poner o No el
    // mensaje de que NO QUEDAN TAREAS
      let hayAlguna=false;
      for (i=0; i<localStorage.length; i++){
        let laClave=localStorage.key(i);
        if(laClave.substr(0,5)=="tarea"){ //Solo las claves que empiecen por "tarea"
           hayAlguna=true;
        }
      }
      if (!hayAlguna){
        document.getElementById('sinTareas').classList.remove('oculto');
      }


  })
}

function fechaHoy(){

  var hoy = new Date();
  var dd = hoy.getDate();
  
  var mm = hoy.getMonth()+1; 
  var yyyy = hoy.getFullYear();
  var hh=hoy.getHours();
  var mi=hoy.getMinutes();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  
  if(mm<10) 
  {
      mm='0'+mm;
  } 

  hoy = yyyy+'-'+mm+'-'+dd+"T"+hh+":"+mi+":00";
  document.getElementById("fechaLimite").value=hoy ;
  
}
