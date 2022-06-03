

//################################ POST de données ################################


//Envoie de la commande au serveur
function SendOrderToBackend(_order_obj){
    fetch(api_url+"order",{
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(_order_obj)
    })
    .then(_result=>{
        if(_result.ok){
            return _result.json();
        }
    })
    .then(_body=>{
        OrderRecieveConfirmation(_body);
    })
    .catch(_error=>{
        console.log("Un problème à été recontré : "+_error);
    });
}


//################################ Modification de données ################################


//Suppression d'un article du panier
function DeleteArticleFromCart(){
    let _DOM_item = event.target.closest("article");
    let _cart_item_index = GetArticleIndexFromDOMitem(_DOM_item);
    //Retrait de l'array et du local storage
    shopping_cart_content.splice(_cart_item_index,1);
    SaveShoppingCartToLocalStorage();
    //Mise à jour du DOM
    document.getElementById("cart__items").removeChild(_DOM_item);
    ShoppingCartTotalDisplay();
}

//Modification de la quantitée depuis le panier
function CartReactToQttChange(){
    let _article_obj = shopping_cart_content[GetArticleIndexFromDOMitem(event.target.closest("article"))];
    let _new_qtt = event.target.value;
    if(CheckIfArticleIsValid(_article_obj.pid,_article_obj.color,_new_qtt)){
        _article_obj.quantity = _new_qtt;
        SaveShoppingCartToLocalStorage();
        ShoppingCartTotalDisplay();
    }else{
        event.target.value = _article_obj.quantity;
    }
}


//################################ Traitement de données ################################


//Limite entre 1 et 100 de qtt forcé
function QuantityChangerClampValue(){
    if(event.target.value<1){
        event.target.value = 1;
    }
    if(event.target.value>100){
        event.target.value = 100;
    }
}

//Vérification de la validité des infos de contact pour la commande
function CheckOrderContactInfo(_first_name,_last_name,_address,_city,_email){
    let _test_passed = 0;
    let _test_to_pass = 5;
    if(ContactCheckFirstName(_first_name)){
        _test_passed++;
    }
    if(ContactCheckLastName(_last_name)){
        _test_passed++;
    }
    if(ContactCheckAdress(_address)){
        _test_passed++;
    }
    if(ContactCheckCity(_city)){
        _test_passed++;
    }
    if(ContactCheckEmail(_email)){
        _test_passed++;
    }
    //Si tout les champs sont valide
    if(_test_passed==_test_to_pass){
        return true;
    }
    return false;
}

//Vérification prénom valide
function ContactCheckFirstName(_first_name){
    if(typeof(_first_name)!="string"){
        console.error("Erreur : Prénom n'est pas une chaine de caractère !");
        return false;
    }
    let _error_DOM = document.getElementById("firstNameErrorMsg");
    if(_first_name.length>0){//le champ n'est pas vide
        let _check_regex = /[^a-zA-Z\- éèà]/;//contien uniquement lettre min, maj, é, è, à, espace et tiret du milieu
        if(_first_name.match(_check_regex)==null){
            DomElementSetText(_error_DOM, "");
            return true;
        }else{
            console.error("Erreur : Prénom invalide");
            DomElementSetText(_error_DOM, "Veuillez entrer un prénom valide !");
            return false;
        }
    }else{
        console.error("Erreur : Prénom vide");
        DomElementSetText(_error_DOM, "Veuillez renseigner votre prénom !");
        return false;
    }
}

//Vérification nom valide
function ContactCheckLastName(_last_name){
    if(typeof(_last_name)!="string"){
        console.error("Erreur : Nom n'est pas une chaine de caractère !");
        return false;
    }
    let _error_DOM = document.getElementById("lastNameErrorMsg");
    if(_last_name.length>0){//le champ n'est pas vide
        let _check_regex = /[^a-zA-Z\- éèà]/;//renvoie null si ne contien que lettres min, maj, é, è, à, espace et tiret du milieu
        if(_last_name.match(_check_regex)==null){
            DomElementSetText(_error_DOM, "");
            return true;
        }else{
            console.error("Erreur : Nom invalide");
            DomElementSetText(_error_DOM, "Veuillez entrer un nom valide !");
            return false;
        }
    }else{
        console.error("Erreur : Nom vide");
        DomElementSetText(_error_DOM, "Veuillez renseigner votre nom de famille !");
        return false;
    }
}

//Vérification adresse valide
function ContactCheckAdress(_address){
    if(typeof(_address)!="string"){
        console.error("Erreur : Adresse n'est pas une chaine de caractère !");
        return false;
    }
    let _error_DOM = document.getElementById("addressErrorMsg");
    if(_address.length>0){//le champ n'est pas vide
        let _check_regex = /\d+\w+/;//renvoie null si ne contiens pas au moins 1 chiffre suivit d'au moins 1 mot
        if(_address.match(_check_regex)!=null){
            DomElementSetText(_error_DOM, "");
            return true;
        }else{
            console.error("Erreur : Adresse invalide");
            DomElementSetText(_error_DOM, "Veuillez entrer une adresse valide !");
            return false;
        }
    }else{
        console.error("Erreur : Adresse vide");
        DomElementSetText(_error_DOM, "Veuillez renseigner votre adresse de domicile !");
        return false;
    }
}

//Vérification ville valide
function ContactCheckCity(_city){
    if(typeof(_city)!="string"){
        console.error("Erreur : Ville n'est pas une chaine de caractère !");
        return false;
    }
    let _error_DOM = document.getElementById("cityErrorMsg");
    if(_city.length>0){//le champ n'est pas vide
        let _check_regex = /[\d@]/;//renvoie null si ne contien pas de chiffre ou de @
        if(_city.match(_check_regex)==null){
            DomElementSetText(_error_DOM, "");
            return true;
        }else{
            console.error("Erreur : Ville invalide");
            DomElementSetText(_error_DOM, "Veuillez entrer une ville valide !");
            return false;
        }
    }else{
        console.error("Erreur : Ville vide");
        DomElementSetText(_error_DOM, "Veuillez renseigner votre ville !");
        return false;
    }
}

//Vérification email valide
function ContactCheckEmail(_email){
    if(typeof(_email)!="string"){
        console.error("Erreur : Email n'est pas une chaine de caractère !");
        return false;
    }
    let _error_DOM = document.getElementById("emailErrorMsg");
    if(_email.length>0){//le champ n'est pas vide
        let _check_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/;//renvoie null si ne contien pas de mot(s) suivit de @ suivit de mot(s)+. suivit d'une extension
        if(_email.match(_check_regex)!=null){
            DomElementSetText(_error_DOM, "");
            return true;
        }else{
            console.error("Erreur : Email invalide");
            DomElementSetText(_error_DOM, "Veuillez entrer un Email valide !");
            return false;
        }
    }else{
        console.error("Erreur : Email vide");
        DomElementSetText(_error_DOM, "Veuillez renseigner votre adresse Email !");
        return false;
    }
}

//Vérification panier valide
function CheckOrderCartContent(){
    if(shopping_cart_content.length>0){
        return true;
    }else{
        console.error("Erreur : Panier vide");
        window.alert("Votre panier est vide !");
        return false;
    }
}

//Préparation des données à envoyer
function BuildOrderToSend(_first_name,_last_name,_address,_city,_email){
    let _order = {
        //Infos client ajouté à la commande
        contact : {
            firstName : String(_first_name),
            lastName : String(_last_name),
            address : String(_address),
            city : String(_city),
            email : String(_email),
        },
        products : [],
    }
    //ID des produits ajouté à la commande
    for(let _i in shopping_cart_content){
        _order.products[_i] = shopping_cart_content[_i].pid;
    }
    return _order;
}

//Traitement de la confirmation de commande
function OrderRecieveConfirmation(_confirmation_obj){
    //On vide le panier si la commande est confirmé
    shopping_cart_content = [];
    SaveShoppingCartToLocalStorage();
    //Et on redirrige sur la page de confirmation
    window.location.href = "confirmation.html?order_id="+_confirmation_obj.orderId;
}


//################################ Récupération de données ################################


//Récupération de l'index d'un article dans le panier à partir de son id et sa couleur
function GetArticleIndexFromDOMitem(_DOM_item){
    let _product_id = _DOM_item.dataset.id;
    let _product_color = _DOM_item.dataset.color;
    for(let _i in shopping_cart_content){
        if(shopping_cart_content[_i].pid==_product_id && shopping_cart_content[_i].color==_product_color){
            return _i;
        }
    }
    return -1;
}

//Récupération du nombre d'article dans le panier
function GetCartArticleAmount(){
    let _amount = 0;
    for(_article of shopping_cart_content){
        _amount+=Number(_article.quantity);
    }
    return _amount;
}

//Récupération du prix total du panier
function GetCartPrice(){
    let _DOM_items = document.getElementsByClassName("item__price");
    let _total_price = 0;
    for(let _i=0; _i<_DOM_items.length; _i++){
        _total_price+=Number(_DOM_items[_i].dataset.price)*Number(shopping_cart_content[_i].quantity);
    }
    return _total_price;
}

//Chargement du panier
function LoadShoppingCart(){
    let _item_loaded_amount = 0;
    //Cas où le Panier est vide
    if(shopping_cart_content.length==0){
        ShoppingCartTotalDisplay(0,0);
    }else{
        for(let _i in shopping_cart_content){
            let _current_item = shopping_cart_content[_i];//on récupère un objet déjà dans le panier
            //On récupère les infos du produits
            GetProduct(_current_item.pid)
            .then(_result=>{
                //Affichage des produits dans le DOM
                ShoppingCartArticleDisplay(_result,_current_item,_i);
                _item_loaded_amount++;
                //Affichage du total une fois que le dernier article est chargé
                if(_item_loaded_amount==shopping_cart_content.length){
                    ShoppingCartTotalDisplay();
                }
            })
            .catch(_error=>{
                console.log("Erreur : "+_error);
            });
        }
    }
}


//################################ Affichage d'éléments ################################


//Affichage d'un article du panier
function ShoppingCartArticleDisplay(_product_info,_article_obj,_local_storage_index){
    //article
    let _article_dom = CreateDomElement("article", null, "cart__item");
    _article_dom.setAttribute("data-id",_article_obj.pid);
    _article_dom.setAttribute("data-color",_article_obj.color);
        //conteneur de l'image de l'article
        CartItemDisplayImgContainer(_article_dom, _product_info);
        //infos de l'article
        CartItemDisplayInfos(_article_dom, _article_obj, _product_info);     
    //ajout de l'article a la liste
    let _article_list_dom = document.getElementById("cart__items");
    _article_list_dom.appendChild(_article_dom);
}

//Affichage du total
function ShoppingCartTotalDisplay(){
    //Nombre d'article total
    let _cart_total_qtt = document.getElementById("totalQuantity");
    DomElementSetText(_cart_total_qtt, String(GetCartArticleAmount()));
    //Prix total
    let _cart_total_price = document.getElementById("totalPrice");
    DomElementSetText(_cart_total_price, String((GetCartPrice()).toFixed(2)).replace(".",","));
}


//################################ Appelés dans la page ################################


//Commande du panier
function CartCommand(){
    let _first_name = document.getElementById("firstName").value;
    let _last_name = document.getElementById("lastName").value;
    let _address = document.getElementById("address").value;
    let _city = document.getElementById("city").value;
    let _email = document.getElementById("email").value;
    //Envoie de la commande si le panier n'est pas vide et que les infos de contact sont valides
    if(CheckOrderCartContent()){
        if(CheckOrderContactInfo(_first_name,_last_name,_address,_city,_email)){
            SendOrderToBackend(BuildOrderToSend(_first_name,_last_name,_address,_city,_email));
        }
    }
    //On empêche la page de se recharger après avoir appuyé sur le bouton commander
    event.preventDefault();
}


//################################ Exécutés automatiquement ################################


//On intègre le panier dans la page panier
LoadShoppingCart();