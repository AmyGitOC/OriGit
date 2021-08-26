let teddies = [];

async function getTeddiesFromAPI() {
    try { // inutile
        const response = await axios.get('http://localhost:3000/api/teddies'); // La requête
        console.log("la requette axios a http://localhost:3000/api/teddies nous renvoie response et response.data qui est egale à :>>", response.data)
        teddies = response.data; // remplissage de la variable, on lui attribue la valeur response.data
    } catch (error) {
        console.log("ATTENTION ERR API LANCER LE SERVER SVP")
        console.error(error);
    }// inutile
}

function fillProduct() {
    let i = 0;
    let result = "";
    while (i < teddies.length) {
        result = result + `
                        <div class="product">
                            <a href="HTML/page-produit.html">
                                <img class="img" src="${teddies[i].imageUrl}" alt="Image de la peluche selectionée">
                            </a> 
                            <div class="product-details">
                                <div class="product-title">${teddies[i].name}<i class="fas fa-paw"></i></div>
                                <div class="product-price">${teddies[i].price}</div>
                                <a href="HTML/page-produit.html">
                                    <button class="">En savoir plus</button>
                                </a>                        
                            </div>                           
                        </div>
                        `
                        // <a onClick="GoToProduct(${teddies[i].id})">
        i++;
    }
    document.getElementById("all-products").innerHTML = result; //innerHTML pour injecter dans le HTML?
}

// async function ageMoyen(selectname) {
//     try {
//         const response = await axios.get(`https://api.agify.io/?name=${selectname}&`); // La requ^te
//         console.log("response :> ", response)
//         return (`Nous avons ${response.data.count} fois le prénom ${selectname} en base de données pour un âge moyen de ${response.data.age} ans.`);
//     } catch (error) { //Gestion des erreurs
//         console.log("ATTENTION ERR API LANCER LE SERVER SVP")
//         console.error(error);
//     }
// }
async function main() {
    await getTeddiesFromAPI();
    fillProduct();
    // const res = await ageMoyen("Amira");
    // console.log(res);







    
// function idrecup() {
//     let i = 0;
//     result = "";
//     console.log(teddies[i].name);
//     while (i != teddies.length) {
//         result = result + `<p style="margin-left:10px">${teddies[i].name}</p>`;
//         i++;
//     }
//     document.getElementById("all-products").style.flexDirection = "column";
//     document.getElementById("all-products").innerHTML = result;
// }

}

main();
