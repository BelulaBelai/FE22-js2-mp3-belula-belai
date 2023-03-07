const baseUrl = `https://js-miniprojekt3-default-rtdb.europe-west1.firebasedatabase.app/`;

async function getAllProducts() {

    const url = baseUrl + 'produkter.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let produkter = Object.values(data);
    console.log(produkter);

    for (let i = 0; i <= produkter.length; i++) {
        const cards = document.createElement('div');
        const img = document.createElement('img');
        const productName = document.createElement('h3');
        const productPrice = document.createElement('p');
        const productAmount = document.createElement('p');


        img.src = produkter[i].url;
        productName.textContent = produkter[i].namn;
        productPrice.textContent = produkter[i].pris + 'kr';
        productAmount.textContent = `Antal produkter kvar: ${produkter[i].saldo}`;

        let productContainer = document.querySelector('#product-container');
        cards.append(img, productName, productPrice, productAmount);
        productContainer.append(cards);
        cards.classList.add('cards');
        document.body.append(productContainer);
    }
};

getAllProducts();
