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

    @GetMapping
    String goToOpere(){
        return "forward:/opere/all";
    }

    @GetMapping(value = "/all")
    String getAuthors(Model model, @RequestParam(name = "src", required = false, defaultValue = "") String src,
    @RequestParam(name = "auth_src", required = false, defaultValue = "") String a_src,
    @RequestParam(name = "annoda", required = false, defaultValue = "" + Integer.MIN_VALUE) Integer annoda,
    @RequestParam(name = "annoa", required = false, defaultValue = "" + Integer.MAX_VALUE) Integer annoa){
        model.addAttribute("opere", opereDAO.findByFilters(a_src, src, annoa, annoda));
        model.addAttribute("nome_o", src);
        model.addAttribute("nome_a", a_src);
        if(annoda != Integer.MIN_VALUE)
            model.addAttribute("annoda", annoda);

        if(annoa != Integer.MAX_VALUE)
            model.addAttribute("annoa", annoa);
        return "opere_admin";
    }

   /*@PostMapping(value = "/opere_update")
    String updateAuthor(Model model, @Valid Opere opere, BindingResult br){
       2
       
    }*/


}
