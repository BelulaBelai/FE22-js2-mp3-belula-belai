
const homeIcon = document.getElementById('homeIcon');
homeIcon.addEventListener("click", goToProductPage);
function goToProductPage() {
  window.location.assign("../index.html");
};

const baseUrl =
  `https://js-miniprojekt3-default-rtdb.europe-west1.firebasedatabase.app/`;
async function getAllProducts() {
  const url = `${baseUrl}produkter.json`;
  const response = await fetch(url);
  const data = await response.json();
  if (data) {
    return Object.values(data);
  }
  return [];
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
  let totalPrice = 0;
  for (let i = 0; i < shoppingCartItems.length; i++) {
    const shoppingCartItem = shoppingCartItems[i];
    totalPrice += shoppingCartItem.totalPrice;
  }
  return totalPrice;
}

async function updateProductBalance(name, amount) {
  const url = `${baseUrl}produkter.json`;
  const response = await fetch(url);
  const data = await response.json();
  const update = Object.fromEntries(
    Object.entries(data).map(([key, product]) => {
      if (product.namn === name) {
        return [
          key,
          {
            namn: product.namn,
            pris: product.pris,
            saldo: product.saldo - amount,
            url: product.url,
          },
        ];
      }
      return [key, product];
    })
  );
  await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(update),
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
    
        <img src="${data.image}" alt="">
        <h3>${data.name}</h3>
        <p>Styck pris: ${data.price}</p>
        <p>Lager status: ${data.balance}</p>
        <p>Antal: ${data.amount}</p>
        <p>Totala pris: ${data.totalPrice} </p>
    </div>
    `;
}

async function main() {
  const cardsElement = document.getElementById("cartCards");
  const allItems = await getAllItems();

  const cardsHtml = allItems.map(createCardHtml).join("<br>");
  cardsElement.innerHTML = cardsHtml;

  const amountElement = document.getElementById("amount");
  amountElement.innerText = await itemAmount();

  const totalPriceElement = document.getElementById("price");
  totalPriceElement.innerText = await totalPrice();

  const removeElement = document.getElementById("removeItemsBtn");
  removeElement.addEventListener("click", async () => {
    await deleteShoppingCart();
    cardsElement.innerHTML = "";
    amountElement.innerText = 0;
    totalPriceElement.innerText = 0;
  });

  const buyElement = document.getElementById("buyItemsBtn");
  buyElement.addEventListener("click", async () => {
    await updateBalance();
    alert("TACK! DITT KÖP ÄR GENOMFÖRT");
    cardsElement.innerHTML = "";
    amountElement.innerText = 0;
    totalPriceElement.innerText = 0;
    deleteShoppingCart();
  });
}
main();