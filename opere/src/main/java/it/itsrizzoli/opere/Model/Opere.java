package it.itsrizzoli.opere.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @NotNull
    @Size(min = 10, max = 300)
    private String descrizione;

    @NotNull
    private Integer id_stanza;

    @NotNull
    private Boolean disabilitato;

    public Opere(Integer id, String nome, Integer anno, String descrizione, Integer id_stanza, Boolean disabilitato) {
        this.id = id;
        this.nome = nome;
        this.anno = anno;
        this.descrizione = descrizione;
        this.id_stanza = id_stanza;
        this.disabilitato = disabilitato;
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

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Integer getId_stanza() {
        return id_stanza;
    }

    public void setId_stanza(Integer id_stanza) {
        this.id_stanza = id_stanza;
    }

    public Boolean getDisabilitato() {
        return disabilitato;
    }

    public void setDisabilitato(Boolean disabilitato) {
        this.disabilitato = disabilitato;
    }

}
