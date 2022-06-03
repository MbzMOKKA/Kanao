
//Création d'un nouvel élément
function CreateDomElement(_type, _id = null, _class = null){
    let _new_element = document.createElement(_type);
    if(_id!==null){
        _new_element.setAttribute("id",_id);
    }
    if(_class!==null){
        _new_element.setAttribute("class",_class);
    }
    return _new_element;
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
function CreateDomImage(_src, _alt, _id = null, _class = null){
    let _new_img = CreateDomElement("img", _id, _class);
    _new_img.setAttribute("src",_src);
    _new_img.setAttribute("alt",_alt);
    return _new_img;
}

//Création d'un nouveau texte
function CreateDomText(_type, _str, _id = null, _class = null){
    let _new_txt = CreateDomElement(_type, _id, _class);
    _new_txt.innerText = _str;
    return _new_txt;
}