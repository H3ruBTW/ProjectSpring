const chooseDefault = document.getElementById("choose-default");
const chooseAggiungi = document.getElementById("choose-aggiungi");
const chooseModifica = document.getElementById("choose-modifica");
const chooseCancella = document.getElementById("choose-cancella");
const addBtn = document.getElementById("add");

function resetChoose() {
    if (chooseDefault) chooseDefault.classList.add("hidden");
    if (chooseAggiungi) chooseAggiungi.classList.add("hidden");
    if (chooseModifica) chooseModifica.classList.add("hidden");
    if (chooseCancella) chooseCancella.classList.add("hidden");
}

function openChooseDefault() {
    resetChoose();
    if (chooseDefault) chooseDefault.classList.remove("hidden");
}

function validaDate(nascitaInput, morteInput) {
    if (nascitaInput && morteInput) {
        const fn = () => {
            const nascita = nascitaInput.value;
            const morte = morteInput.value;

            if (morte !== "" && nascita !== "" && morte < nascita) {
                morteInput.setCustomValidity("Data di morte non valida");
            } else {
                morteInput.setCustomValidity("");
            }
        };
        nascitaInput.addEventListener("change", fn);
        morteInput.addEventListener("change", fn);
        fn();
    }
}

const aggiungiNascita = document.getElementById("aggiungi-nascita");
const aggiungiMorte = document.getElementById("aggiungi-morte");
validaDate(aggiungiNascita, aggiungiMorte);

const modificaNascita = document.getElementById("modifica-nascita");
const modificaMorte = document.getElementById("modifica-morte");
validaDate(modificaNascita, modificaMorte);

let autoreIdDaCancellare = null;

const opereWrapperEvent = document.querySelector(".opere-wrapper");
if (opereWrapperEvent) {
    opereWrapperEvent.addEventListener("click", function(event) {
        const btnModifica = event.target.closest(".btn-modifica");
        const btnCancella = event.target.closest(".btn-cancella");

        if (btnModifica) {
            const card = btnModifica.closest(".opera-card");
            if (!card) return;

            const idEl = card.querySelector(".autore-id");
            if (!idEl) return;

            resetChoose();
            if (chooseModifica) chooseModifica.classList.remove("hidden");

            const modificaId = document.getElementById("modifica-id");
            const modificaNome = document.getElementById("modifica-nome");
            const modificaCognome = document.getElementById("modifica-cognome");
            
            if (modificaId) modificaId.value = idEl.textContent.trim();
            if (modificaNome) modificaNome.value = card.dataset.nome || "";
            if (modificaCognome) modificaCognome.value = card.dataset.cognome || "";
            if (modificaNascita) modificaNascita.value = card.dataset.dataNascita || "";
            if (modificaMorte) modificaMorte.value = card.dataset.dataMorte || "";
        }

        if (btnCancella) {
            const card = btnCancella.closest(".opera-card");
            if (!card) return;

            const nomeEl = card.querySelector(".autore-nome-cognome");
            const idEl = card.querySelector(".autore-id");
            if (!idEl) return;

            autoreIdDaCancellare = idEl.textContent.trim();

            resetChoose();
            if (chooseCancella) chooseCancella.classList.remove("hidden");

            const cancellaId = document.getElementById("cancella-id");
            if (cancellaId) cancellaId.value = autoreIdDaCancellare;

            const deleteMessage = document.getElementById("delete-message");
            if (deleteMessage && nomeEl) {
                deleteMessage.textContent =
                    `Vuoi davvero cancellare l'autore "${nomeEl.textContent.trim()}"?`;
            }
        }
    });
}

document.querySelectorAll(".btn-annulla-choose").forEach(btn => {
    btn.addEventListener("click", function () {
        openChooseDefault();
    });
});

if (addBtn) {
    addBtn.addEventListener("click", function () {
        resetChoose();
        if (chooseAggiungi) chooseAggiungi.classList.remove("hidden");

        const aggiungiNome = document.getElementById("aggiungi-nome");
        const aggiungiCognome = document.getElementById("aggiungi-cognome");
        
        if (aggiungiNome) aggiungiNome.value = "";
        if (aggiungiCognome) aggiungiCognome.value = "";
        if (aggiungiNascita) aggiungiNascita.value = "";
        if (aggiungiMorte) aggiungiMorte.value = "";
    });
}

openChooseDefault();
