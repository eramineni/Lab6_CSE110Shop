// Script.js
// Script.js
/*eslint-env browser*/

//localStorage.clear();
window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('Content') == null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => myFunc(data)); 
}
    
    else {
        //console.log("Hello");
        var cont = JSON.parse(localStorage.getItem('Content'));
        var ul = document.getElementById("product-list");
        //console.log(cont);

        for(var k in cont) {
            const list_el = document.createElement('product-item');
            list_el.title = cont[k].title; 
            list_el.price = cont[k].price;
            list_el.img = cont[k].image;
            list_el.id = cont[k].id;
            ul.appendChild(list_el);
        }

        for(var k in cont) {
            if(ul.childNodes[k].button) {

            }
        }
    }
});


 function myFunc(res) {
    localStorage.setItem('Content', JSON.stringify(res));
    var cont = JSON.parse(localStorage.getItem('Content'));
    var ul = document.getElementById("product-list");

    for(var k in cont) {
        const list_el = document.createElement('product-item');
        list_el.title = cont[k].title; 
        list_el.price = cont[k].price;
        list_el.img = cont[k].image;
        list_el.id = cont[k].id;

        ul.appendChild(list_el);
    }
}
