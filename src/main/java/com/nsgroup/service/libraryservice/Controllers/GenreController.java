package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.Genres;
import com.nsgroup.service.libraryservice.Repsoitories.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class GenreController {

    @Autowired
    GenreRepository genreRepository;

    @RequestMapping(value = { "/genres"}, method = RequestMethod.GET)
    public @ResponseBody
    Iterable<Genres> getAllGenres() {
        return genreRepository.findAll();
    }

    @RequestMapping(value = { "/genre-add"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addGenre(@RequestBody Genres genre) {
        genreRepository.save(genre);
    }

    @RequestMapping(value = { "/genre-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editGenre(@RequestBody Genres genre){
        genreRepository.save(genre);
    }

    @RequestMapping(value = { "/genre-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteGenre(@PathVariable("id") Long id){
        genreRepository.deleteById(id);
    }

}
