//array que almacena los datos de los platos: nombre y precio
var platos = [
	["Cochinillo asado", 22],
	["Huevos rotos con chorizo", 10],
	["Cocido gallego", 14],
	["Salmón a la plancha", 12],
	["Merluza a la gallega", 16],
	["Escalopines de ternera", 10],
	["Ternera asada", 10],
	["Rodaballo de la ría", 28],
	["calamares en su tinta", 15]
];
//array que almacena los datos de las bebidas: nombre y precio
var bebidas = [
	["Agua", 1],
	["Refresco", 1.5],
	["Botella de Godello", 12],
	["Botella de Ribera del Duero", 16],
	["Botella de Cava", 15],
	["Botella de Rioja",],
	["Botella de Albariño", 14]
];
//array que almacena los datos de los postres: nombre y precio
var postres = [
	["Goulant con nata", 5],
	["Fresas con nata", 4],
	["Filloas rellenas", 3.5],
	["Pieza de fruta", 1],
	["Natillas", 2.5],
	["Arroz con leche", 3],
	["Bola de helado", 1.5]
];

var menu = []
var precioMenu = []
var menuFavorito = []


window.addEventListener("load", iniciar, false);

function iniciar() {
	var mostrarPlato = document.getElementById('plato')
	var mostrarBebida = document.getElementById('bebida')
	var mostrarPostre = document.getElementById('postre')

	var listaMenus = document.getElementById('listaMenus')

	var botonMenu = document.getElementById('generarMenu')
	var botonFav = document.getElementById('grabarFavorito')
	var checkFavorito = document.getElementById('favorito')

	mostrarArrais(platos, mostrarPlato)
	mostrarArrais(bebidas, mostrarBebida)
	mostrarArrais(postres, mostrarPostre)


	botonMenu.addEventListener("click", crearMenu, false);
	listaMenus.addEventListener("click", mostrarPrecio, false)
	botonFav.addEventListener("click", anadirFavorito, false)
	checkFavorito.addEventListener("click", limpiarFavorito, false)

}


function mostrarArrais(arr, eleme) {
	var nuevoSelect = document.createElement('option')
	nuevoSelect.id = 0;
	eleme.appendChild(nuevoSelect)
	for (var i = 0; i < arr.length; i++) {
		var nuevoSelect = document.createElement('option')
		nuevoSelect.id = i + 1
		nuevoSelect.textContent = arr[i][0]
		eleme.appendChild(nuevoSelect)
	}

}

function crearMenu() {
	var platoSeleccinado = document.getElementById('plato').selectedOptions[0].id
	var bebidaSeleccinado = document.getElementById('bebida').selectedOptions[0].id
	var postreSeleccinado = document.getElementById('postre').selectedOptions[0].id

	var precio = 0
	//vamos a meter en un string el menú para comprobar primero si ya existe
	//si no existe, lo añadimos al array menú, si existe lanzamos un mensaje por pantalla y NO lo añadimos
	var comprobarString
	var contador = menu.length
	if (platoSeleccinado == 0 && bebidaSeleccinado == 0 && postreSeleccinado == 0) {
		alert("Seleccione al menos un elemento del mení para añadirlo a favorito.")

	} else {
		if (platoSeleccinado != 0) {
			comprobarString = document.getElementById('plato').selectedOptions[0].textContent
			//como al crear la id de los productos le di un valor +1, aquí se lo tengo que quitar 
			precio += platos[platoSeleccinado - 1][1]
		}
		if (bebidaSeleccinado != 0) {
			comprobarString += ", " + document.getElementById('bebida').selectedOptions[0].textContent
			precio += bebidas[bebidaSeleccinado - 1][1]
		}
		if (postreSeleccinado != 0) {
			comprobarString += ", " + document.getElementById('postre').selectedOptions[0].textContent
			precio += postres[postreSeleccinado - 1][1]
		}
	}

	if (!comprobarRepetido(comprobarString)) {
		menu[contador] = comprobarString
		listarMenus(menu[contador], contador)
		precioMenu[contador] = precio;
	}
}

function listarMenus(menu, contador) {
	var listaMenus = document.getElementById('listaMenus')
	var nuevoSelect = document.createElement('option')
	nuevoSelect.id = contador
	//Puesto que le he pasado una sección específica del menú, puedo añadirlo directamente
	nuevoSelect.textContent = menu
	listaMenus.appendChild(nuevoSelect)
}


function mostrarPrecio() {
	var menuSeleccionado = document.getElementById('listaMenus').selectedOptions[0].id
	var mostrarPrecioFinal = document.getElementById('precio')
	var precioMenuSelecc = precioMenu[menuSeleccionado]
	mostrarPrecioFinal.value = precioMenuSelecc
}


function anadirFavorito() {
	var menuSeleccionado = document.getElementById('listaMenus').selectedOptions[0].textContent
	var menuFav = document.getElementById('menuFavorito')
	if (!document.getElementById('favorito').checked) {
		alert("Debe marcar el cuadro Menú favorito para prodecer a su guardado")
	} else {
		if (confirm("Se va a añadir: " + menuSeleccionado + ", a la lista de menús\nConfirme su selección")) {
			menuFav.value = menuSeleccionado
			//localStorage, como un array
			localStorage.setItem("menuFavorito", [menuSeleccionado])
			mostrarPrecio()
		}
	}
}

function limpiarFavorito() {
	var menuFav = document.getElementById('menuFavorito')
	if (document.getElementById('favorito').checked) {
		menuFav.value = localStorage.getItem("menuFavorito")
	} else { menuFav.value = " " }
}

function comprobarRepetido(x) {
	for (var i = 0; i < menu.length; i++) {
		if (menu[i].includes(x)) {
			alert("Menú repetido")
			return true;
		}
	}
}