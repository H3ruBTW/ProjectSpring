document.addEventListener("DOMContentLoaded", () => {
    const authorInput = document.getElementById("auth_src");
    const authorIdInput = document.getElementById("auth_id");
    const suggestionsBox = document.getElementById("autore-suggestions");

    let debounceTimer;
    let lastQuery = "";

    function clearSuggestions() {
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
    }

    function showSuggestions(authors) {
        suggestionsBox.innerHTML = "";

        if (!authors || authors.length === 0) {
            clearSuggestions();
            return;
        }

        authors.forEach(author => {
            const item = document.createElement("div");
            item.classList.add("suggestion-item");
            item.textContent = `${author.nome} ${author.cognome}`;

            item.addEventListener("click", () => {
                authorInput.value = `${author.nome} ${author.cognome}`;
                authorIdInput.value = author.id;
                clearSuggestions();
            });

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.style.display = "block";
    }

    async function fetchAuthors(query) {
        if (!query || query.trim().length < 2) {
            clearSuggestions();
            return;
        }

        lastQuery = query;

        try {
            const response = await fetch(`/autori/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                clearSuggestions();
                return;
            }

            const data = await response.json();

            if (authorInput.value.trim() === lastQuery) {
                showSuggestions(data);
            }
        } catch (error) {
            clearSuggestions();
        }
    }

    authorInput.addEventListener("input", () => {
        authorIdInput.value = "";

        clearTimeout(debounceTimer);

        const query = authorInput.value.trim();

        debounceTimer = setTimeout(() => {
            fetchAuthors(query);
        }, 400);
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".autore-search-box")) {
            clearSuggestions();
        }
    });
});