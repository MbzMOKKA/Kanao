

//################################ Récupération de données ################################


//Extraction de l'id d'une commande depuis l'URL de la page actuelle
function GetOrderIDFromURL(){
    return new URL(window.location.href).searchParams.get("order_id");
}


//################################ Affichage d'éléments ################################


//Affichage de la validation de commande
function DisplayOrderConfirmation(){
    let _dom_order_id = document.getElementById("orderId");
    DomElementSetText(_dom_order_id, GetOrderIDFromURL());
}


//################################ Exécutés automatiquement ################################


//Affichage de l'ID de commande dans la page de confirmation
DisplayOrderConfirmation();