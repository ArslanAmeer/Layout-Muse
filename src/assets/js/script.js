"use strict"

var search = document.getElementById("search");
search.onfocus = function(){
    this.parentNode.style.border = "1px solid white";
    this.removeAttribute("placeholder");
}

search.onblur = function(){
    this.parentNode.style.border = "none";
    this.placeholder = "Search";
}
