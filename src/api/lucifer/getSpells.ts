// Sitas throwina gal 10 exceptionu
export const getLuciferQuote = async () => {
const res = await fetch("https://hp-api.onrender.com/api/spells");
return await res.json();
}