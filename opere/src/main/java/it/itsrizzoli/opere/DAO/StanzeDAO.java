package it.itsrizzoli.opere.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import it.itsrizzoli.opere.Model.Opere;
import it.itsrizzoli.opere.Model.Stanze;

public interface StanzeDAO extends CrudRepository<Stanze, Integer> {
    
}