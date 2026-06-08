package it.itsrizzoli.opere.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import it.itsrizzoli.opere.Model.Autori;

public interface AutoriDAO extends CrudRepository<Autori, Integer> {
    @Query("select a from Autori a where concat(a.nome,' ', a.cognome) like %:src%")
    List<Autori> findAuthorsByLike(@Param("src") String src);

    @Query("""
        SELECT a
        FROM Autori a
        WHERE LOWER(CONCAT(a.nome, ' ', a.cognome)) LIKE LOWER(CONCAT('%', :q, '%'))
           OR LOWER(CONCAT(a.cognome, ' ', a.nome)) LIKE LOWER(CONCAT('%', :q, '%'))
    """)
    List<Autori> findByFullName(@Param("q") String q);
}
