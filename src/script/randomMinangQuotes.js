const minangQuotes = [
    "Hidup indak saketek, bakawanlah nan maota.",
    "Kalau lah takuak, bakilah tagak.",
    "Bia lambek asal selamat.",
    "Hiduik baraja, bajalan ka nan tahu.",
    "Sakik sakik dahulu, senang senang kemudian."
];

const getRandomMinangQuote = () => {


    const randomIndex = Math.floor(Math.random() * minangQuotes.length);
    return minangQuotes[randomIndex];
};

export default getRandomMinangQuote;