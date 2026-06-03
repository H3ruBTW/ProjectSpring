package it.itsrizzoli.opere.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "opere")
public class Opere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Size(min = 2, max = 100)
    private String nome;

    @NotNull
    private Integer anno;

    @ManyToMany
    @JoinTable(
        name = "autori_opere",
        joinColumns = @JoinColumn(name = "id_opera"),
        inverseJoinColumns = @JoinColumn(name = "id_autore")
    )
    private List<Autori> autori = new ArrayList<>();

    @NotNull
    @Size(min = 10, max = 300)
    private String descrizione;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_stanza", nullable = false) 
    private Stanze stanza;

    private Boolean disattivato;

    public Opere(Integer id, String nome, Integer anno, String descrizione, Stanze stanza, Boolean disattivato) {
        this.id = id;
        this.nome = nome;
        this.anno = anno;
        this.descrizione = descrizione;
        this.stanza = stanza;
        this.disattivato = disattivato;
    }

    public Opere() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getAnno() {
        return anno;
    }

    public void setAnno(Integer anno) {
        this.anno = anno;
    }

    public List<Autori> getAutori() {
        return autori;
    }

    public void setAutori(List<Autori> autori) {
        this.autori = autori;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Stanze getStanza() {
        return stanza;
    }

    public void setStanza(Stanze stanza) {
        this.stanza = stanza;
    }

    public Boolean getDisattivato() {
        return disattivato;
    }

    public void setDisattivato(Boolean disattivato) {
        this.disattivato = disattivato;
    }

}
