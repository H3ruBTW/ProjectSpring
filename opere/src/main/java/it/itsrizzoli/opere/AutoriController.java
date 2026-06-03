package it.itsrizzoli.opere;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import it.itsrizzoli.opere.DAO.AutoriDAO;
import it.itsrizzoli.opere.Model.Autori;
import jakarta.validation.Valid;

@Controller
@RequestMapping(value = "/autori")
public class AutoriController {
    @Autowired
    AutoriDAO autoriDAO;

    @GetMapping(value = "/all")
    String getAuthors(Model model){
        model.addAttribute("autori", autoriDAO.findAll());
        return "autori_admin";
    }

     

    @GetMapping(value = "/auth_update")
    String getUpdateAPage(Model model, @RequestParam(name = "a")Integer id, Autori autori){
        model.addAttribute("autore", autoriDAO.findById(id).orElseThrow());
        return "modifica_autore";
    }

    @PostMapping(value = "/auth_update")
    String updateAuthor(Model model, @Valid Autori autori, BindingResult br){
        if(autori.getDataMorte() != null && autori.getDataMorte().isBefore(autori.getDataNascita())){
            br.rejectValue("dataMorte", "err.dataMorte", "Data di morte è prima della data di nascita");
            return "/autori/auth_update";
        }

        if(br.hasErrors())
            return "/autori/auth_update";

        autoriDAO.save(autori);
        return "redirect:/autori/all";
    }

    @GetMapping(value = "/auth_delete")
    String getDeleteAPage(Model model, @RequestParam(name = "a")Integer id){
        model.addAttribute("autore", autoriDAO.findById(id).orElseThrow());
        return "cancella_autore";
    }

    @PostMapping(value = "/auth_delete")
    String deleteAuthor(Model model, @RequestParam Integer id){
        autoriDAO.deleteById(id);
        return "redirect:/autori/all";
    }

    @GetMapping(value = "/auth_add")
    String getAddAPage(Model model, Autori autori){
        return "aggiungi_autore";
    }

    @PostMapping(value = "/auth_add")
    String addAuthor(Model model, @Valid Autori autori, BindingResult br){
        if(autori.getDataMorte() != null && autori.getDataMorte().isBefore(autori.getDataNascita())){
            model.addAttribute("err", "Data di morte è prima della data di nascita");
            return "/autori/auth_add";
        }

        if(br.hasErrors())
            return "/autori/auth_add";

        autoriDAO.save(autori);
        return "redirect:/autori/all";
    }
}