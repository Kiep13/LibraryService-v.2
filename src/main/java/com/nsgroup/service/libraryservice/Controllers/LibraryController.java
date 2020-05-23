package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.Libraries;
import com.nsgroup.service.libraryservice.Repsoitories.LibraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class LibraryController {

    @Autowired
    LibraryRepository libraryRepository;

    @RequestMapping(value = {"/libraries"}, method = RequestMethod.GET)
    public @ResponseBody Iterable<Libraries> getAllLibraries() {
        return libraryRepository.findAll();
    }

    @RequestMapping(value = {"/library-add"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addLibrary(@RequestBody Libraries library) {
        libraryRepository.save(library);
    }

    @RequestMapping(value = {"/library-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editLibrary (@RequestBody Libraries library) {
        libraryRepository.save(library);
    }

    @RequestMapping(value = {"/library-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteLibrary(@PathVariable("id") Long id){
        libraryRepository.deleteById(id);
    }

}
