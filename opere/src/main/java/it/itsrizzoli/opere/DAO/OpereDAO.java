package it.itsrizzoli.opere.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import it.itsrizzoli.opere.Model.Opere;

public interface OpereDAO extends CrudRepository<Opere, Integer> {
    @Query("""
        SELECT DISTINCT o
        FROM Opere o
        JOIN o.autori a
        WHERE (
            LOWER(CONCAT(a.nome, ' ', a.cognome)) LIKE LOWER(CONCAT('%', :n_auth, '%'))
            OR LOWER(CONCAT(a.cognome, ' ', a.nome)) LIKE LOWER(CONCAT('%', :n_auth, '%'))
        )
        AND LOWER(o.nome) LIKE LOWER(CONCAT('%', :n_opera, '%'))
        AND o.anno BETWEEN :annoda AND :annoa
    """)
    List<Opere> findByFilters(@Param("n_auth") String nome_autore, @Param("n_opera") String nome_opera, 
    @Param("annoa") Integer annoA, @Param("annoda") Integer annoDa);
}