
//Création d'un nouvel élément
function CreateDomElement(_type){
    return document.createElement(_type);
}

//Modification de la classe d'un élément
function DomElementSetClass(_dom_element, _class){
    _dom_element.setAttribute("class",_class);
}

//Modification du texte d'un élément
function DomElementSetText(_dom_element, _text){
    _dom_element.innerText = _text;
}

//Création d'une nouvelle option de selecteur
function CreateDomSelectorOption(_txt, _value){
    let _new_option = CreateDomElement("option");
    _new_option.innerText = _txt;
    _new_option.setAttribute("value",_value);
    return _new_option;
}

//Création d'une nouvelle image
function CreateDomImage(_src, _alt){
    let _new_img = CreateDomElement("img");
    _new_img.setAttribute("src",_src);
    _new_img.setAttribute("alt",_alt);
    return _new_img;
}