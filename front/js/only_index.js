

//################################ Récupération de données ################################


//Chargement de l'intégralité des produits depuis l'API
function LoadProductList(){
    //On récupère la liste des produits
    GetProduct("all")
        .then(_result=>{
            //Affichage des produits dans le DOM
            ProductListDisplay(_result);
        })
        .catch(_error=>{
            console.log("Erreur : "+_error);
        });
}


//################################ Affichage d'éléments ################################


//Modification du DOM pour integrer les articles
function ProductListDisplay(_product_list){
    let _product_section = document.getElementById("items");
    for(let _i of _product_list){
        IndexProductDisplay(_product_section, _i);
    }
}


//################################ Exécutés automatiquement ################################


//Chargement de l'intégralité des produits dans l'accueil
LoadProductList();