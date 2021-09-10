import * as myLibrary from "./library.js";

let panier = [];

function deleteAll() {
  localStorage.clear();
  fillPanierHtml();
  alert("Votre panier a bien été supprimé.")
}

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

function sendOrder() {
  let DOMForm = document.getElementById("leForm");
  let validity = DOMForm.reportValidity();
  if (!validity) {
    return
  }
  let nom = document.getElementById("leNom").value;
  let prenom = document.getElementById("lePrenom").value;
  let adresse = document.getElementById("lAdresse").value;
  let ville = document.getElementById("laVille").value;
  let email = document.getElementById("lEmail").value;
  let pannierIds = [];
  panier.forEach(function (elem) { //Possibilité d'ajouter deux autres paramètres l'index et l'array mais inutiles ici
    pannierIds.push(elem._id)  //tableau qui regroupe id + qte
  });
  let payload = {
    contact: {
      firstName: prenom,
      lastName: nom,
      adress: adresse,
      city: ville,
      email: email
    },
    products: pannierIds,
  };
  console.log(payload)
}

function panierRecup() {
  let panierStr = localStorage.getItem("PDT");
  if (!panierStr) {
    panierStr = "[]";
  }
  let panierObjet = JSON.parse(panierStr);
  panier = panierObjet;
}

function fillPanierHtml() {
  console.log("panier dans fillPanierHtml", panier)
  let tablePanierDOM = document.getElementById("tablePanier");
  console.log("tablePanierDOM", tablePanierDOM);
  let qteTotale = 0;
  let prixTotal = 0;
  let htmlStr = ` <table id="tablePanier">
  <tr>
      <th><i>Article</i></th>
      <th><i>Quantité</i></th>
      <th><i>Prix</i></th>
  </tr>`
  panier.forEach(function (elem) {
    prixTotal += elem.price * elem.qte;
    qteTotale = qteTotale + elem.qte;
    htmlStr += `
    <tr>
      <td>${elem.name}</td>
      <td>${elem.qte}</td>
      <td>${myLibrary.priceConvert(elem.price * elem.qte)}</td>
    </tr>`
  })
  htmlStr +=
    `<tr>
        <td><b>Total</b></td>
        <td><b>${qteTotale}</b></td>
        <td><b>${myLibrary.priceConvert(prixTotal)}</b></td>
    </tr>
  </table>`;
  if (panier.length == 0) { //Attention ici égalité et non assignation!
    htmlStr = `<p>Votre pannier est vide</p>`
  }
  tablePanierDOM.innerHTML = htmlStr;
}

async function main() {
  panierRecup();
  fillPanierHtml();
  window.deleteAll = deleteAll; 
  window.sendOrder = sendOrder; 
}

main()

