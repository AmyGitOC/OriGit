import urlApi from "./urlApi.js"
import * as myLibrary from "./library.js";

let teddie = {};
// FONCTION AXIOS QUI RECUPERE L ID DU TEDDIE DANS L API 
async function getTeddieFromAPI(id_teddie) {
  let response = null;
  const url = urlApi + "/api/teddies/" + id_teddie;

  // BLOC TRY CATCH POUR AXIOS 
  try {
    response = await axios.get(url);
  } catch (error) {
    console.log("ATTENTION ERR API LANCER LE SERVER SVP")
    console.error(error);
  }
  teddie = response.data;
}

// FONCTION QUI INJECTE LES DONNEES CONCERNANT L ID SELECTIONNE DANS LE HTML
function fillOneTeddie() {
  let nbColor = teddie.colors.length;
  let htmlColorOption = '';
  let i = 0;
  while (i < nbColor) {
    htmlColorOption = htmlColorOption + `<option>${teddie.colors[i]}</option>`
    i++;
  }
  let htmlstr = `
                <img class="img-product-details" src="${teddie.imageUrl}" alt="Peluche selectionnée">
                <div class="product-details">               
                    <div class="">Craquez pour ${teddie.name}</div>
                    <div class="product-description">${teddie.description}</div>
                    <div class="Menu-deroulant">Selectionnez une couleur
                        <select class="color-select"> ` +
                            htmlColorOption
                       + `</select>
                    </div>
                    <div class="product-price">${myLibrary.priceConvert(teddie.price)}</div>
                    <button onClick="clickProduct()">Ajouter au panier</button>
                  </div>
                 `;
  document.getElementById("selected-product").innerHTML = htmlstr; 
}

// FONCTION QUI EXTRAIT L ID DE L URL
function getParamFromUrl(queryParameter) {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  const urlSearchParams = new URLSearchParams(window.location.search); 
  return urlSearchParams.get(queryParameter);
}

function clickProduct() {
  // let panierStr = JSON.stringify(panier);
  // localStorage.setItem("panier", panierStr);
  let pdtEnregistreDansLS = JSON.parse(localStorage.getItem("PDT"));
  let existant = false;
  if (pdtEnregistreDansLS) {
    pdtEnregistreDansLS.forEach(function (tedieDuLS, i) {
      if (teddie._id == tedieDuLS._id) {
        tedieDuLS.qte = tedieDuLS.qte + 1;
        existant = true;
      }
    });
    if (!existant) {
      teddie.qte = 1;
      pdtEnregistreDansLS.push(teddie)
    }
  }
  else {
    pdtEnregistreDansLS = [];
    teddie.qte = 1;
    pdtEnregistreDansLS.push(teddie);
  }
  localStorage.setItem("PDT", JSON.stringify(pdtEnregistreDansLS));
  alert("Produit ajouté au pannier!");
}

// let array1 = [{qte: 1, _id: "a77"}, {qte: 1, _id: "b89"}, {qte: 1, _id: "c12"}];
// function clickProduct() {
//   const product = {
//     qte: 2,
//     _id: "d04"
//   }
//   let produitTrouve = false;

//   array1.forEach(function (elem, index) { 
//     if (elem._id == product._id && product.qte > 0) {
//       elem.qte = elem.qte + product.qte;
//       produitTrouve = true; 
//     }
//     console.log("elem nb " + index + " = ", elem)
//   });
//   if (!produitTrouve) {
//     array1.push(product)
//   }
//   // j'ai pas trouvé je push le produit dans l'array
//   console.log("array1 :>", array1)
// }


async function main() {
  const id_product = getParamFromUrl("id_product"); // = "5be9c8541c9d440000665243"
  await getTeddieFromAPI(id_product);
  fillOneTeddie();
  window.clickProduct = clickProduct; // permet d'ajouter la fonction clickProduct à la page html (Windows) par la clé .clickProduct
}

main();
