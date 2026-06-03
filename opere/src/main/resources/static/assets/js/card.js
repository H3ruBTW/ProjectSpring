class Card {
    constructor(id, nome, autori, anno, img, descrizione, stanza, restauro, disattivato) {
        this.id = id;
        this.nome = nome;
        this.autori = autori; // Array di oggetti autore: {nome, cognome, dataNascita, dataMorte}
        this.anno = anno;
        this.img = img;
        this.descrizione = descrizione;
        this.stanza = stanza;
        this.restauro = restauro; // booleano
        this.disattivato = disattivato; // booleano
    }

    formattaAutori() {
        return this.autori
            .map(autore => {
                const nome = (autore.nome || "").trim();
                const cognome = (autore.cognome || "").trim();
                const dataNascita = (autore.dataNascita || "").trim();
                const dataMorte = (autore.dataMorte || "").trim();

                if (!nome && !cognome && !dataNascita && !dataMorte) {
                    return "Autore sconosciuto";
                }

                const nomeCompleto = `${nome} ${cognome}`.trim();
                const morteFinale = dataMorte || "attuale";

                return `${nomeCompleto} (${dataNascita} - ${morteFinale})`;
            })
            .join("; ");
    }

    getStato() {
        if (this.disattivato) return "Disattivata";
        if (this.restauro) return "In restauro";
        return "Attiva";
    }

    generaHTML() {
        const authorsData = JSON.stringify(this.autori)
            .replaceAll("&", "&amp;")
            .replaceAll("'", "&#39;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");

        const descriptionData = this.descrizione
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");

        return `
            <div class="opera-card"
                 data-authors='${authorsData}'
                 data-description="${descriptionData}"
                 data-room-id="${this.stanza.id}"
                 data-room-name="${this.stanza.nome}"
                 data-restauro-attivo="${this.restauro}"
                 data-disattivato="${this.disattivato}">
                <img class="img-card" src="${this.img}" alt="${this.nome}">

                <div class="info-gen">
                    <p><strong>ID:</strong> <span class="opera-id">${this.id}</span></p>
                    <h3 class="opera-nome">${this.nome}</h3>
                    <p><strong>Autore:</strong> <span class="autore">${this.formattaAutori()}</span></p>
                    <p><strong>Anno:</strong> <span class="anno">${this.anno}</span></p>
                    <p><strong>Stanza:</strong> <span class="stanza">${this.stanza.nome}</span></p>
                    <p><strong>Stato:</strong> <span class="stato-opera">${this.getStato()}</span></p>
                </div>

                <div class="operations">
                    <hr>
                    <button type="button" class="btn-modifica">Modifica</button>
                    <button type="button" class="btn-cancella">Cancella</button>
                </div>
            </div>
        `;
    }
}
