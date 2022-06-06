

//Affichage d'un produit dans l'accueil
function IndexProductDisplay(_parent, _product_obj){
    //liens qui contient l'article
    let _product = document.createElement("a");
    _product.setAttribute("href","product.html?id="+String(_product_obj._id));
    //article qui contient les infos
    let _product_article = CreateDomElement("article");
    IndexProductDisplayImage(_product_article, _product_obj);
    IndexProductDisplayName(_product_article, _product_obj);
    IndexProductDisplayDescription(_product_article, _product_obj);
    _product.appendChild(_product_article);
    //ajout du liens à la liste
    _parent.appendChild(_product);
}

//Affichage de l'image d'un produit dans l'accueil
function IndexProductDisplayImage(_parent, _product_obj){
    let _product_img = CreateDomImage(_product_obj.imageUrl, _product_obj.altTxt+", "+_product_obj.name);
    _parent.appendChild(_product_img);
}

//Affichage du nom d'un produit dans l'accueil
function IndexProductDisplayName(_parent, _product_obj){
    let _product_name = CreateDomText("h3", _product_obj.name, null, "productName");
    _parent.appendChild(_product_name);
}

//Affichage de la courte description d'un produit dans l'accueil
function IndexProductDisplayDescription(_parent, _product_obj){
    let _product_desc = CreateDomText("p", _product_obj.description, null, "productDescription");
    _parent.appendChild(_product_desc);
}