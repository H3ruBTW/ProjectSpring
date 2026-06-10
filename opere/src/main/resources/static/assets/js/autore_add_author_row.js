const aggiungiAutoriWrapper = document.getElementById("aggiungi-autori-wrapper");
const modificaAutoriWrapper = document.getElementById("modifica-autori-wrapper");
const aggiungiAutoreBtn = document.getElementById("aggiungi-autore-btn");
const modificaAutoreBtn = document.getElementById("modifica-autore-btn");

function clearSuggestions(box) {
    box.innerHTML = "";
    box.style.display = "none";
}

function showSuggestions(authors, textInput, hiddenIdInput, suggestionsBox) {
    suggestionsBox.innerHTML = "";

    if (!authors || authors.length === 0) {
        clearSuggestions(suggestionsBox);
        return;
    }

    authors.forEach(author => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.textContent = `${author.nome} ${author.cognome}`;

        item.addEventListener("mousedown", () => {
            textInput.value = `${author.nome} ${author.cognome}`;
            hiddenIdInput.value = author.id;
            clearSuggestions(suggestionsBox);
        });

        suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
}

function attachAutocomplete(textInput, hiddenIdInput, suggestionsBox) {
    let debounceTimer;
    let lastQuery = "";

    async function fetchAuthors(query) {
        if (!query || query.trim().length < 2) {
            clearSuggestions(suggestionsBox);
            return;
        }

        lastQuery = query;

        try {
            const response = await fetch(`/autori/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                clearSuggestions(suggestionsBox);
                return;
            }

            const data = await response.json();

            if (textInput.value.trim() === lastQuery) {
                showSuggestions(data, textInput, hiddenIdInput, suggestionsBox);
            }
        } catch (error) {
            clearSuggestions(suggestionsBox);
        }
    }

    textInput.addEventListener("input", () => {
        hiddenIdInput.value = "";
        clearTimeout(debounceTimer);

        const query = textInput.value.trim();

        debounceTimer = setTimeout(() => {
            fetchAuthors(query);
        }, 400);
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".autore-search-box")) {
            clearSuggestions(suggestionsBox);
        }
    });
}

function creaAutoreRow(nomeCompleto = "", authorId = "") {
    const row = document.createElement("div");
    row.className = "autore-row";

    row.innerHTML = `
        <div class="autore-search-box">
            <input 
                type="text" 
                class="autore-search-input" 
                name="auth_src[]" 
                placeholder="Cerca autore"
                value="${nomeCompleto}"
                autocomplete="off"
            >
            <input 
                type="hidden" 
                class="autore-id-input" 
                name="auth_id[]" 
                value="${authorId}"
            >
            <div class="autore-suggestions"></div>
        </div>
        <button type="button" class="btn-rimuovi-autore">Rimuovi</button>
    `;

    const textInput = row.querySelector(".autore-search-input");
    const hiddenIdInput = row.querySelector(".autore-id-input");
    const suggestionsBox = row.querySelector(".autore-suggestions");
    const removeBtn = row.querySelector(".btn-rimuovi-autore");

    attachAutocomplete(textInput, hiddenIdInput, suggestionsBox);

    removeBtn.addEventListener("click", function () {
        const wrapper = row.parentElement;
        if (wrapper && wrapper.querySelectorAll(".autore-row").length > 1) {
            row.remove();
        }
    });

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