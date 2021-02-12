// product-item.js
var arr = []; 
//localStorage.setItem("Items", JSON.stringify(arr));
var cont = [];
class ProductItem extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    const template = document.createElement('template');
    template.innerHTML =
        `<style>
        .price {
            color: green;
            font-size: 1.8em;
            font-weight: bold;
            margin: 0;
          }
        .product {
            align-items: center;
            background-color: white;
            border-radius: 5px;
            display: grid;
            grid-template-areas: 
            'image'
            'title'
            'price'
            'add';
            grid-template-rows: 67% 11% 11% 11%;
            height: 450px;
            filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
            margin: 0 30px 30px 0;
            padding: 10px 20px;
            width: 200px;
          }
        .product > button {
            background-color: rgb(255, 208, 0);
            border: none;
            border-radius: 5px;
            color: black;
            justify-self: center;
            max-height: 35px;
            padding: 8px 20px;
            transition: 0.1s ease all;
        }
        .product > button:hover {
            background-color: rgb(255, 166, 0);
            cursor: pointer;
            transition: 0.1s ease all;
        }
        .product > img {
            align-self: center;
            justify-self: center;
            width: 100%;
        }
        .title {
            font-size: 1.1em;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .title:hover {
            font-size: 1.1em;
            margin: 0;
            white-space: wrap;
            overflow: auto;
            text-overflow: unset;
        }
        </style><li class="product"><img src="" width=200><p class="title"></p><p class="price"></p><button>Add to Cart</button></li>`;
        this.root = this.attachShadow({mode: 'open'});
        this.root.appendChild(template.content.cloneNode(true));
        if(localStorage.getItem("Items") != null) {
            arr = JSON.parse(localStorage.getItem("Items"));
        }
        let shadow = this.shadowRoot;
            cont = JSON.parse(localStorage.getItem('Content'));
            var n = 0;
        /*
        for(let a in arr) {
            
        }
        */
            if(JSON.parse(localStorage.getItem("Items")) != null) {
                document.getElementById('cart-count').innerHTML = JSON.parse(localStorage.getItem("Items")).length;
            }
            
            shadow.childNodes[1].childNodes[3].addEventListener("click", function() {
                if(shadow.childNodes[1].childNodes[3].innerHTML == "Add to Cart") {
                    shadow.childNodes[1].childNodes[3].innerHTML = "Remove from Cart";
                    n = Number(document.getElementById('cart-count').innerHTML);
                    document.getElementById('cart-count').innerHTML = n+1;
                    
                    for(let i = 0; i < cont.length; i++){
                        if(shadow.childNodes[1].childNodes[0].src == cont[Number(i)].image) {
                            arr.push(cont[Number(i)].id);
                            break;
                        }
                    }
                    localStorage.setItem("Items", JSON.stringify(arr));
                    
                }
                else {
                    shadow.childNodes[1].childNodes[3].innerHTML = "Add to Cart";
                    n = Number(document.getElementById('cart-count').innerHTML);
                    document.getElementById('cart-count').innerHTML = n-1;
                    
                    
                    for(let i = 0; i<cont.length; i++) {
                        if(shadow.childNodes[1].childNodes[0].src == cont[Number(i)].image) {
                            for(let a in arr) {
                                if(arr[a] == cont[i].id) {
                                    arr.splice(a, 1);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    
                    localStorage.setItem("Items", JSON.stringify(arr));
                    
                }
                console.log(arr);
                console.log(this.getAttribute('id'));
            })     
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        let shadow = this.shadowRoot;
        
        if(name == 'title') {
            shadow.childNodes[1].childNodes[1].innerHTML = newValue;
        }
        else if(name == 'price') {
            shadow.childNodes[1].childNodes[2].innerHTML = '$' + newValue;
        }
        else if(name == 'img'){
            shadow.childNodes[1].childNodes[0].src = newValue;
        }
        else if(name = 'id') {
            for(let a in arr) {
                if(newValue == arr[a]) {
                    if(shadow.childNodes[1].childNodes[3].innerHTML == "Add to Cart"){
                        shadow.childNodes[1].childNodes[3].innerHTML = "Remove from Cart";
                    }
                    else {
                        shadow.childNodes[1].childNodes[3].innerHTML = "Add to Cart"
                    }
                }
            }
        }
    }   
    
    static get observedAttributes() {
        return ['title', 'price', 'img', 'id'];
    }
    set title(newValue) {
        this.setAttribute('title', newValue);
    }
    
    set price(newValue) {
        this.setAttribute('price', newValue);
    }
    
    set img(newValue) {
        this.setAttribute('img', newValue);
    }
    
    set id(newValue) {
        this.setAttribute('id', newValue);
    }
    
    get id() {
        this.getAttribute('id');
    }
   
}
customElements.define('product-item', ProductItem);
