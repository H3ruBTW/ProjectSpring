class CardAutore {
    constructor(id, nome, cognome, dataNascita, dataMorte) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.dataNascita = dataNascita;
        this.dataMorte = dataMorte;
    }

    generaHTML() {
        const nomeCompleto = `${this.nome} ${this.cognome}`.trim();

        return `
            <div class="opera-card"
                 data-nome="${this.nome}"
                 data-cognome="${this.cognome}"
                 data-data-nascita="${this.dataNascita}"
                 data-data-morte="${this.dataMorte}">
                
                <div class="info-gen" style="margin-top: 10px;">
                    <p><strong>ID:</strong> <span class="autore-id">${this.id}</span></p>
                    <h3 class="autore-nome-cognome">${nomeCompleto}</h3>
                    <p><strong>Data di Nascita:</strong> <span class="autore-nascita">${this.dataNascita}</span></p>
                    <p><strong>Data di Morte:</strong> <span class="autore-morte">${this.dataMorte}</span></p>
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
