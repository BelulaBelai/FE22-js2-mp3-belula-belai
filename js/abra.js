//Funktion för att hämta (Alla produkt) från produktsida

async function getAllItems() {
  const baseUrl =
  `https://js-miniprojekt3-default-rtdb.europe-west1.firebasedatabase.app/`;
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

export { getAllItems, itemAmount };
