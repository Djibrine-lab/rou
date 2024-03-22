'use strict'
//Requête vers serveur local
//var request = location.origin+'/api/pizza.json'

//Requête vers serveur distant
var request = "https://pizza-24297-default-rtdb.firebaseio.com/pizza.json"


var getHeritages = (obj) =>{
    var prototype = Object.getPrototypeOf(obj)
    var result = []
    while (prototype) {
        result[result.length] = prototype.constructor.name 
        prototype = Object.getPrototypeOf(prototype)

    }
    return result
}

var getNumber = (nb) =>{
    if(typeof(nb) !== "number"){
        throw new Error("La fonction attend un nombre")
    }
    return nb
}


try {
    console.log(getNumber("2"));
} catch (error) {
    console.log('Error :',error.message);
}

var getPizzaData = async () =>{
    let response = await fetch(request)
    let pizzas = await response.json()
    return pizzas
}

var useData = async ()=>{
    var data = await getPizzaData()
    data = Object.values(data)
    var app = document.getElementById('app')
    app ? app.innerHTML = "" : null 

    
    data.forEach(product => {
        var productItem = `
                <div class="product-item relative">
                    <img src="${product.image}" width="150" alt="">
                    <div class="product-details">
                        <div class="product-name">${product.name}</div>
                        <div class="add-to-cart absolute">Ajouter au panier</div>
                        <div class="product-price">
                            <span class="sold-price">${product.soldPrice/100}</span>
                            <span class="regular-price"><del>${product.price/100}</del></span>
                        </div>
                    </div>
                </div>
        `
        app.innerHTML += productItem
       // console.log(productItem);
    });
}

useData()

