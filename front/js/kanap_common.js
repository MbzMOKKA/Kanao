

//################################ Initialisation de données ################################


const api_url = "http://localhost:3000/api/products/";
var shopping_cart_content = [];


//################################ Modification de données ################################


//Sauvegarde du panier dans le local storage
function SaveShoppingCartToLocalStorage(){
    let _shopping_cart_obj = {
        content : shopping_cart_content,
    }
    let _shopping_cart_str = JSON.stringify(_shopping_cart_obj);
    localStorage.setItem("shopping_cart",_shopping_cart_str);
}


//################################ Traitement de données ################################


//Fabrication de l'URL de la requête à partir de l'ID du produit
function BuildRequestURL(_id){
    let _url = api_url;
    //si _id=="all" alors ont cherche à récupérer tout les produits
    //sinon ont recupère juste le produit correspondant à _id
    if(_id!="all"){
        _url = api_url+_id;
    }
    return _url;
}

//Detection des erreurs (quantité invalide, couleur pas choisit...)
function CheckIfArticleIsValid(_product_id,_product_color,_product_qtt){
    if(_product_color=="none"){
        window.alert("Veuillez choisir une couleur !");
        console.error("Erreur : Aucune couleur n'a été choisit !");
        return false;
    }
    if(!(_product_qtt>=1 && _product_qtt<=100)){
        window.alert("Veuillez choisir un nombre d'article en 1 et 100 !");
        console.error("Erreur : La quantité n'est pas valide !");
        return false;
    }
    return true;
}


//################################ Récupération de données ################################


//Chargement du panier depuis le local storage
function LoadShoppingCartFromLocalStorage(){
    let _shopping_cart_obj = JSON.parse(localStorage.getItem("shopping_cart"));
    if(_shopping_cart_obj!=null){
        shopping_cart_content = _shopping_cart_obj.content;
    }
}

//Obtention de l'objet d'un/des produits depuis l'API
async function GetProduct(_id){
    try{
        let _result = await fetch(BuildRequestURL(_id));
        if(_result.ok){
            return _result.json();
        }
    }catch(_error){
        console.log("Un problème à été recontré : "+_error);
    }
}

//Traduction ID couleur en FR
function GetColorName(_color_id){
    let _color_name = {
        "Brown" : "Marron",
        "Pink" : "Rose",
        "Red" : "Rouge",
        "Silver" : "Argenté",
        "Yellow" : "Jaune",
        "White" : "Blanc",
        "Grey" : "Gris",
        "Blue" : "Bleu",
        "Black" : "Noir",
        "Black/Yellow" : "Noir/Jaune",
        "Black/Red" : "Noir/Rouge",
        "Green" : "Vert",
        "Orange" : "Orange",
        "Purple" : "Violet",
        "Navy" : "Bleu marine",
    };
    return _color_name[_color_id];
}


//################################ Exécutés automatiquement ################################


//On charge le panier quelque soit la page
LoadShoppingCartFromLocalStorage();