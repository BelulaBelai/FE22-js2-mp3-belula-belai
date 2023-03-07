//Vet ej om nedanstående (configuration osv) behövs men lägger in det här sålänge ändå 

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBNLbI_zFYj7UNXXVMoVVQ_duuiJZD4ozM",
//   authDomain: "js-miniprojekt3.firebaseapp.com",
//   projectId: "js-miniprojekt3",
//   storageBucket: "js-miniprojekt3.appspot.com",
//   messagingSenderId: "798780073612",
//   appId: "1:798780073612:web:b2effc2378e7c580aa3da9",
//   measurementId: "G-8C98JL2JCX"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



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
