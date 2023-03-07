let balance = [
    {
        name: "röd tröja",
        amount: 1000
    },
    {
        name: "blå tröja",
        amount: 1000
    },
];
let shoppingCartItems = [
    {
        name: "blå tröja",
        amount: 2,
    }
];

//Funktion för att hämta (Alla produkt) från produktsida
async function getAllItems() {
  return shoppingCartItems;
}

//Funktion för att hämta (Antal) från produktsida
async function itemAmount() {
  return shoppingCartItems.length;
}

//Funktion som plussa ihop alla produkter från kundvagnen för att få det totala priset

function totalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < shoppingCartItems.length; i++) {
    const shoppingCartItem = shoppingCartItems[i];
    totalPrice += shoppingCartItem.price;
  }
  return totalPrice;
}

//Funktion som uppdatera saldo på firebase
async function updateBalance() {
    for(let i = 0; i<balance.length; i++){
        const balanceItem = balance[i];
        
        for(let j=0; j<shoppingCartItems.length; j++){
            const shoppingCartItem = shoppingCartItems[j];
            if (shoppingCartItem.name === balanceItem.name) {
                balanceItem.amount -= shoppingCartItem.amount
            }
        }
    }
}

//En funktion som töms varukorgen
async function deleteShoppingCart() {
  shoppingCartItems = [];
}

//Funktion som kan kolla från en tidigare session vilka produkter som finns i kundvagnen
async function sessionStorage() {}
