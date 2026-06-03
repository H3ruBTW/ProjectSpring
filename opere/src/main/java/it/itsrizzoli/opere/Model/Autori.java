package it.itsrizzoli.opere.Model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Autori {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Size(min=2,max=30)
    private String nome;

    @NotNull
    @Size(min=2,max=30)
    private String cognome;

    @NotNull
    @Column(name = "dataNascita")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dataNascita;

    @Column(name = "dataMorte")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate dataMorte;

    @ManyToMany(mappedBy = "autori")
    private List<Opere> opere = new ArrayList<>();

    public Autori(){}

    public Autori(String nome,String cognome, LocalDate dataNascita, LocalDate dataMorte){
        this.nome = nome;
        this.cognome = cognome;
        this.dataNascita = dataNascita;
        this.dataMorte = dataMorte;
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

    public LocalDate getDataNascita() {
        return dataNascita;
    }

    public LocalDate getDataMorte() {
        return dataMorte;
    }

    public List<Opere> getOpere() {
        return opere;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public void setDataNascita(LocalDate dataNascita) {
        this.dataNascita = dataNascita;
    }

    public void setDataMorte(LocalDate dataMorte) {
        this.dataMorte = dataMorte;
    }

    public void setOpere(List<Opere> opere) {
        this.opere = opere;
    }
}