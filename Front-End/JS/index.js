let teddies = [];

async function getTeddiesFromAPI() {
    const url = 'http://localhost:3000/api/teddies';
    try { // inutile
        const response = await axios.get(url); // La requête
        console.log("la requette axios a http://localhost:3000/api/teddies nous renvoie response et response.data qui est egale à :>>", response.data) // console.log
        teddies = response.data; // remplissage de la variable, on lui attribue la valeur response.data (data qui est un attribut de l'objet. Attribut qui contient les les paires clé/valeur)
    } catch (error) {
        console.log("ATTENTION ERR API LANCER LE SERVER SVP")
        console.error(error);
    }// inutile
}

function fillProducts() {
    let i = 0;
    let result = "";
    while (i < teddies.length) {
        result = result + `
                        <div class="product">
                            <a href="HTML/page-produit.html?id_product=${teddies[i]._id}">
                                <img class="img" src="${teddies[i].imageUrl}" alt="Image de la peluche selectionée" />
                            </a> 
                            <div class="product-details">
                                <div class="product-title">${teddies[i].name}<i class="fas fa-paw"></i></div>
                                <div class="product-price">${teddies[i].price}</div>
                               <a href="HTML/page-produit.html?id_product=${teddies[i]._id}">
                                    <button type="button" class="button" >En savoir plus</button>
                                </a>
                            </div>                           
                        </div>
                        `
        i++;
    }
    document.getElementById("all-products").innerHTML = result; //innerHTML pour injecter dans le HTML?y
}

async function main() {
    await getTeddiesFromAPI();
    fillProducts();


}

main();
