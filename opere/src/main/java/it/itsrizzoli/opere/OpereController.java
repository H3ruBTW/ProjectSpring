package it.itsrizzoli.opere;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import it.itsrizzoli.opere.DAO.OpereDAO;
import it.itsrizzoli.opere.Model.Opere;
import jakarta.validation.Valid;


@Controller
@RequestMapping(value = "/opere")
public class OpereController {
    @Autowired
    OpereDAO opereDAO;

    @GetMapping(value = "/all")
    String getAuthors(Model model){
        model.addAttribute("opere", opereDAO.findAll());
        return "opere_admin";
    }

    /*@PostMapping(value = "/all")
    String getAuthorsByName(Model model, @RequestParam String src){
        model.addAttribute("src", src);
        model.addAttribute("autori",opereDAO.findOpereByLike(src));
        return "opere_admin";
    }*/

   /*@PostMapping(value = "/opere_update")
    String updateAuthor(Model model, @Valid Opere opere, BindingResult br){
       2
       
    }*/


}
