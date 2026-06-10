const aggiungiAutoriWrapper = document.getElementById("aggiungi-autori-wrapper");
const modificaAutoriWrapper = document.getElementById("modifica-autori-wrapper");
const aggiungiAutoreBtn = document.getElementById("aggiungi-autore-btn");
const modificaAutoreBtn = document.getElementById("modifica-autore-btn");


function creaAutoreRow(nome = "", cognome = "", dataNascita = "", dataMorte = "") {
    const row = document.createElement("div");
    row.className = "autore-row";

    row.innerHTML = `
        <input type="text" class="autore-nome" placeholder="Nome" value="${nome}">
        <input type="text" class="autore-cognome" placeholder="Cognome" value="${cognome}">
        <input type="date" class="autore-data-nascita" value="${dataNascita}">
        <input type="date" class="autore-data-morte" value="${dataMorte}">
        <button type="button" class="btn-rimuovi-autore">Rimuovi</button>
        <p class="autore-error hidden">La data di morte non può essere precedente alla data di nascita.</p>
    `;

    const removeBtn = row.querySelector(".btn-rimuovi-autore");
    const nascitaInput = row.querySelector(".autore-data-nascita");
    const morteInput = row.querySelector(".autore-data-morte");
    const errorEl = row.querySelector(".autore-error");

    function validaDateAutore() {
        const nascita = nascitaInput.value;
        const morte = morteInput.value;

        if (morte !== "" && nascita !== "" && morte < nascita) {
            morteInput.setCustomValidity("Data di morte non valida");
            errorEl.classList.remove("hidden");
        } else {
            morteInput.setCustomValidity("");
            errorEl.classList.add("hidden");
        }
    }

    nascitaInput.addEventListener("change", validaDateAutore);
    morteInput.addEventListener("change", validaDateAutore);

    removeBtn.addEventListener("click", function () {
        const wrapper = row.parentElement;
        if (wrapper && wrapper.querySelectorAll(".autore-row").length > 1) {
            row.remove();
        }
    });

    validaDateAutore();
    return row;
}


if (aggiungiAutoreBtn) {
    aggiungiAutoreBtn.addEventListener("click", function () {
        if (aggiungiAutoriWrapper) {
            aggiungiAutoriWrapper.appendChild(creaAutoreRow());
        }
    });
}

if (modificaAutoreBtn) {
    modificaAutoreBtn.addEventListener("click", function () {
        if (modificaAutoriWrapper) {
            modificaAutoriWrapper.appendChild(creaAutoreRow());
        }
    });
}
