let autoriFake = [
    {
        id: "AU001",
        nome: "Vincent",
        cognome: "van Gogh",
        dataNascita: "1853-03-30",
        dataMorte: "1890-07-29"
    },
    {
        id: "AU002",
        nome: "Mario",
        cognome: "Rossi",
        dataNascita: "1985-06-12",
        dataMorte: ""
    }
];

const opereWrapper = document.querySelector(".opere-wrapper");

function renderAutori() {
    if (!opereWrapper) return;
    
    opereWrapper.innerHTML = autoriFake.map(autore => {
        const cardObj = new CardAutore(
            autore.id,
            autore.nome,
            autore.cognome,
            autore.dataNascita,
            autore.dataMorte
        );
        return cardObj.generaHTML();
    }).join("");
}

renderAutori();
