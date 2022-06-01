

//################################ Modification de données ################################


//Ajout des articles au panier
function AddArticleToShoppingCart(_product_obj){
    let _article_added = _product_obj.quantity;
    for(let _i=0; _i<=shopping_cart_content.length; _i++){
        let _current_item = shopping_cart_content[_i];
        if(_current_item==undefined){
            //si aucun article identique existe déjà dans le panier
            //alors on ajoute l'article en tant que nouveau
            shopping_cart_content.push(_product_obj);
            break;
        }else{
            if(_product_obj.pid==_current_item.pid && _product_obj.color==_current_item.color){
                //si l'objet que l'on veut ajouter possède le même id et la même couleur
                //alors on additionne juste les quantitées
                _current_item.quantity = Number(_current_item.quantity)+Number(_product_obj.quantity);
                if(_current_item.quantity>100){
                    let _article_cancelled_amount = _current_item.quantity-100;
                    console.error("Attention : La quantité à atteint sa limite (100) !");
                    window.alert("Limite d'article similaire atteinte : "+String(_article_cancelled_amount)+" article(s) non ajoutés au panier !");
                    _article_added-=_article_cancelled_amount;
                    _current_item.quantity = 100;
                }
                break;
            }
        }
    }
    if(_article_added>0){
        SaveShoppingCartToLocalStorage();
        let _str = "Article ajouté au panier !";
        if(_article_added>1){
            _str = String(_article_added)+" articles ajoutés au panier !";
        }
        window.alert(_str);
    }
}


//################################ Récupération de données ################################


//Extraction de l'id du produit depuis l'URL de la page actuelle
function GetPIDFromURL(){
    return new URL(window.location.href).searchParams.get("id");
}

//Extraction de la qtt de produit choisit
function GetProductQtt(){
    return document.getElementById("quantity").value;
}

//Extraction de la couleur de produit choisit
function GetProductColor(){
    return document.getElementById("colors").value;
}

//Chargement des infos du produit depuis l'API
function LoadProductInfo(){
    //On récupère les infos du produits
    GetProduct(GetPIDFromURL())
        .then(_result=>{
            //Affichage du produits dans le DOM
            ProductInfoDisplay(_result);
        })
        .catch(_error=>{
            console.log("Erreur : "+_error);
        });
}


//################################ Affichage d'éléments ################################


//Modification du DOM pour integrer les infos de l'article
function ProductInfoDisplay(_product_info){
    //image
    let _img_container = document.getElementsByClassName("item__img")[0];
    let _img_media = CreateDomImage(_product_info.imageUrl, _product_info.altTxt+`, `+_product_info.name);
    _img_container.appendChild(_img_media);
    //nom de la page
    let _dom_page_title = document.getElementsByTagName("title")[0];
    DomElementSetText(_dom_page_title, _product_info.name+" - Kanap");
    //nom de l'article
    let _dom_title = document.getElementById("title");
    DomElementSetText(_dom_title, _product_info.name);
    //prix
    let _dom_price = document.getElementById("price");
    DomElementSetText(_dom_price, _product_info.price);
    //description
    let _dom_description = document.getElementById("description");
    DomElementSetText(_dom_description, _product_info.description);
    //couleurs
    DisplayColorsAvailable(_product_info.colors);
}

//Modification du DOM pour integrer les options de couleurs
function DisplayColorsAvailable(_colors){
    let _color_selector = document.getElementById("colors");
    for(let _i of _colors){
        let _color_choice_DOM = CreateDomSelectorOption(GetColorName(_i), _i);
        _color_selector.appendChild(_color_choice_DOM);
    }
}


//################################ Appelés dans la page ################################


//Tentative d'ajouter un produit au panier
function AddToCart(){
    let _product_id = GetPIDFromURL();
    let _product_color = GetProductColor();
    let _product_qtt = GetProductQtt();
    if(CheckIfArticleIsValid(_product_id,_product_color,_product_qtt)){//on vérifie qu'une couleur et qu'un nombre valide sont saisit
        let _product_obj = {
            pid : _product_id,
            color : _product_color,
            quantity : _product_qtt,
        }
        AddArticleToShoppingCart(_product_obj);//on ajoute au panier
    }
}


//################################ Exécutés automatiquement ################################


//Chargement des infos du produit dans sa page dédiés
LoadProductInfo();