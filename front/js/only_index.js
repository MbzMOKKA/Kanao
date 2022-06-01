

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
                //image
                let _product_img = CreateDomImage(_i.imageUrl, _i.altTxt+`, `+_i.name);
                //nom
                let _product_name = CreateDomElement("h3");
                    DomElementSetClass(_product_name, "productName");
                    DomElementSetText(_product_name, _i.name);
                //description
                let _product_desc = CreateDomElement("p");
                    DomElementSetClass(_product_desc, "productDescription");
                    DomElementSetText(_product_desc, _i.description);
            //article qui contient les infos
            let _product_article = CreateDomElement("article");
            _product_article.appendChild(_product_img);
            _product_article.appendChild(_product_name);
            _product_article.appendChild(_product_desc);
        //liens qui contient l'article
        let _product = document.createElement("a");
        _product.setAttribute("href","product.html?id="+String(_i._id));
        _product.appendChild(_product_article);
        _product_section.appendChild(_product);
    }
}


//################################ Exécutés automatiquement ################################


//Chargement de l'intégralité des produits dans l'accueil
LoadProductList();