// fonction pour generer les cartes des menus (italien americain asiatique)

function cards(selectedCategory, targetId) {
    const request = new XMLHttpRequest();
    request.open("GET", "menus.json", true);
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            let content = "";
            for (let menu of data.menus) {
                for (let category of menu.categories) {
                    const foundSubcategory = category.subcategories.find(subcategory => subcategory.name === selectedCategory);
                    if (foundSubcategory) {
                        foundSubcategory.products.forEach(product => {
                            content += 
                            `<div class="card" style="width: 18rem;">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                                <div class="card-body">
                                  <h5 class="card-title">${product.name} <span>${product.pieces}</span></h5>
                                  <p class="card-text">${product.description}</p>
                                  <div class="price-rating">
                                    <h5><i class="fa-solid fa-dollar-sign"></i> ${product.price}</h5>
                                    <h5><i class="fa-regular fa-star"></i> ${product.rating}</h5>
                                  </div>
                                  <button class="order-button">Order Now <i class="fa-solid fa-cart-shopping"></i></button>
                                </div>
                            </div>`;
                        });
                    }
                }
            }
            if (content) {
                document.getElementById(targetId).innerHTML = content;
            }
        }
    };
    request.send();
}


