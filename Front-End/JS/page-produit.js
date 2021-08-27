let teddie = {};

function priceConvert(cents) {
  var prixRond = cents / 100;
  return (prixRond.toFixed(2) + "€");
}
 
async function getTeddieFromAPI(id_teddie) {
  // VRAIABLE 
  let response = null;
  const url = "http://localhost:3000/api/teddies/" + id_teddie;

  // BLOC TRY CATCH POUR AXIOS 
  try {
    response = await axios.get(url);
  } catch (error) {
    console.log("ATTENTION ERR API LANCER LE SERVER SVP")
    console.error(error);
  }
  teddie = response.data;
}


function fillOneTeddie() {
  let nbColor = teddie.colors.length // = 4
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
                    <div class="product-price">${priceConvert(teddie.price)}</div>
                    <button class="">Ajouter au panier</button>
                  </div>
                 `;
  document.getElementById("selected-product").innerHTML = htmlstr; 
}


function getParamFromUrl(queryParameter) {
  // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  const urlSearchParams = new URLSearchParams(window.location.search); 
  const params = Object.fromEntries(urlSearchParams.entries());
  return params[queryParameter]; // C'est un objet malgré les crochets 
}
async function main() {
  const id_product = getParamFromUrl("id_product"); // = "5be9c8541c9d440000665243"
  await getTeddieFromAPI(id_product);
  fillOneTeddie();
}

main();
