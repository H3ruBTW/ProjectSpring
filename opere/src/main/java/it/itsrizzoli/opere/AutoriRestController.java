package it.itsrizzoli.opere;

import it.itsrizzoli.opere.DAO.AutoriDAO;
import it.itsrizzoli.opere.Model.AutoriSearch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AutoriRestController {
    @Autowired
    AutoriDAO autoriDAO;

    @GetMapping("/autori/search")
    @ResponseBody
    public List<AutoriSearch> searchAutori(@RequestParam("q") String q) {
        return autoriDAO.findByFullName(q).stream()
            .map(a -> new AutoriSearch(a.getId(), a.getNome(), a.getCognome()))
            .toList();
    }
}
