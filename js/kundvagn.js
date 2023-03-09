
const homeIcon = document.getElementById('homeIcon');
homeIcon.addEventListener("click", goToProductPage);
function goToProductPage() {
  window.location.assign("../index.html");
};

const baseUrl =
  "https://js-miniprojekt3-default-rtdb.europe-west1.firebasedatabase.app/";
async function getAllProducts() {
  const url = `${baseUrl}produkter.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Funktion för att hämta (Alla produkt) från produktsida
async function getAllItems() {
  const url = `${baseUrl}shoppingcart.json`;
  const response = await fetch(url);
  const json = await response.json();
  if (json) {
    return Object.values(json);
  }
  return [];
}

//Funktion för att hämta (Antal) från produktsida
async function itemAmount() {
  return (await getAllItems()).length;
}

//Funktion som plussa ihop alla produkter från kundvagnen för att få det totala priset
async function totalPrice() {
  const shoppingCartItems = await getAllItems();
  const products = await getAllProducts();
  let totalPrice = 0;
  for (let i = 0; i < shoppingCartItems.length; i++) {
    const shoppingCartItem = shoppingCartItems[i];
    for (let j = 0; j < products.length; j++) {
      const product = products[j];
      if (product.namn === shoppingCartItem.name) {
        totalPrice += product.pris * shoppingCartItem.amount;
      }
    }
    totalPrice += shoppingCartItem.price;
  }
  return totalPrice;
}

async function updateProductBalance(name, amount) {
  const products = await getAllProducts();
  products.map((product) => {
    if (product.namn === name) {
      return {
        namn: product.namn,
        pris: product.pris,
        saldo: product.saldo - amount,
        url: product.url,
      };
    }
    return product;
  });
}

//Funktion som uppdatera saldo på firebase
async function updateBalance() {
  const shoppingCartItems = await getAllItems();
  for (let i = 0; i < shoppingCartItems.length; i++) {
    const shoppingCartItem = shoppingCartItems[i];
    await updateProductBalance(shoppingCartItem.name, shoppingCartItem.amount);
  }
}

//En funktion som töms varukorgen
async function deleteShoppingCart() {
  const url = `${baseUrl}shoppingcart.json`;
  await fetch(url, {
    method: "DELETE",
  });
}

function createCardHtml(data) {
  return `
    <div>
        <img src="${data.url}" alt="">
        <h3>${data.name}</h3>
        <p>Styck pris: ${data.price}</p>
        <p>Saldo: ${data.balance}</p>
        <p>Antal: ${data.amount}</p>
        <h3>Totala pris: ${data.totalPrice} </h3>
    </div>
    `;
}

async function main() {
  const cardsElement = document.getElementById("cartCards");
  const allItems = await getAllItems();
  console.log(Array.isArray(allItems));

  const cardsHtml = allItems.map(createCardHtml).join("<br>");
  cardsElement.innerHTML = cardsHtml;

  const amountElement = document.getElementById("amount");
  amountElement.innerText = await itemAmount();

  const totalPriceElement = document.getElementById("price");
  totalPriceElement.innerText = await totalPrice();

  const removeElement = document.getElementById("removeItemsBtn");
  removeElement.addEventListener("click", async () => {
    await deleteShoppingCart();
  });

  const buyElement = document.getElementById("buyItemsBtn");
  buyElement.addEventListener("click", async () => {
    await updateBalance();
  });
}
main();
