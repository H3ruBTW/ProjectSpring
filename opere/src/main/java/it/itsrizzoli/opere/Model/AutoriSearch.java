package it.itsrizzoli.opere.Model;


public class AutoriSearch {
    private Integer id;
    private String nome;
    private String cognome;

    public AutoriSearch(Integer id, String nome, String cognome) {
        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
    }

    public Integer getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCognome() {
        return cognome;
    }
}
