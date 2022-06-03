

//Affichage des quantités du produit dans le panier
function CartItemDisplaySettingQtt(_parent, _article_obj){
    let _article_qtt = CreateDomElement("div", null, "cart__item__content__settings__quantity");
        //"Qté"
        let _article_qtt_word = CreateDomText("p", "Qté :");
        //input
        let _article_qtt_input = CreateDomElement("input", null, "itemQuantity");
        _article_qtt_input.setAttribute("type", "number");
        _article_qtt_input.addEventListener("change",CartReactToQttChange);
        _article_qtt_input.setAttribute("name", "itemQuantity");
        _article_qtt_input.setAttribute("min", "1");
        _article_qtt_input.setAttribute("max", "100");
        _article_qtt_input.setAttribute("value", String(_article_obj.quantity));
    _article_qtt.appendChild(_article_qtt_word);
    _article_qtt.appendChild(_article_qtt_input);
    _parent.appendChild(_article_qtt);
}

//Affichage du bouton supprimer dans le panier
function CartItemDisplaySettingDelete(_parent, _article_obj){
    let _article_delete = CreateDomElement("div", null, "cart__item__content__settings__delete");
    //bouton supprimer
    let _article_delete_button = CreateDomText("p", "Supprimer", null, "deleteItem");
    _article_delete_button.addEventListener("click",DeleteArticleFromCart);
    _article_delete.appendChild(_article_delete_button);
    _parent.appendChild(_article_delete);
}

//Affichage des infos de l'article dans le panier
function CartItemDisplayArticleInfo(_parent, _article_obj, _product_info){
    let _article_description = CreateDomElement("div", null, "cart__item__content__description");
        //nom
        let _article_name = CreateDomText("h2", _product_info.name);
        //couleur
        let _article_color = CreateDomText("p", GetColorName(_article_obj.color));
        //prix
        let _article_price = CreateDomText("p", String((_product_info.price).toFixed(2)).replace(".",",")+" €", null, "item__price");
        _article_price.setAttribute("data-price", String(_product_info.price));
    _article_description.appendChild(_article_name);
    _article_description.appendChild(_article_color);
    _article_description.appendChild(_article_price);
    _parent.appendChild(_article_description);
}

//Affichage des paramètre du produit dans le panier
function CartItemDisplayInfoSettings(_parent, _article_obj){
    let _article_settings = CreateDomElement("div", null, "cart__item__content__settings");
    //quantitée
    CartItemDisplaySettingQtt(_article_settings, _article_obj);
    //supprimer
    CartItemDisplaySettingDelete(_article_settings, _article_obj);
    _parent.appendChild(_article_settings);
}

//Affichage des infos du produit dans le panier
function CartItemDisplayInfos(_parent, _article_obj, _product_info){
    let _article_infos = CreateDomElement("div", null, "cart__item__content");
    //infos du produit
    CartItemDisplayArticleInfo(_article_infos, _article_obj, _product_info);
    //paramètre de l'article
    CartItemDisplayInfoSettings(_article_infos, _article_obj);
    _parent.appendChild(_article_infos);
}
//Affichage de l'illustration du produit dans le panier
function CartItemDisplayImgContainer(_parent, _product_info){
    let _article_image_container = CreateDomElement("div", null, "cart__item__img");
        //image de l'article
        let _article_img = CreateDomImage(_product_info.imageUrl, _product_info.altTxt+", "+_product_info.name);
    _article_image_container.appendChild(_article_img);
    _parent.appendChild(_article_image_container);
}