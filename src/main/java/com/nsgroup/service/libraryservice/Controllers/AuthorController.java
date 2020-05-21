package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.Authors;
import com.nsgroup.service.libraryservice.Repsoitories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class AuthorController {

    @Autowired
    AuthorRepository authorRepository;

    @RequestMapping(value = { "/authors"}, method = RequestMethod.GET)
    public @ResponseBody
    Iterable<Authors> getAllAuthors() {
        return authorRepository.findAll();
    }

    @RequestMapping(value = {"/author-add"}, method =  RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addAuthor(@RequestBody Authors author){
        authorRepository.save(author);
    }

    @RequestMapping(value = { "/author-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editAuthor(@RequestBody Authors author){
        authorRepository.save(author);
    }

    @RequestMapping(value = { "/author-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteAuthor(@PathVariable("id") Long id){
        authorRepository.deleteById(id);
    }

}
