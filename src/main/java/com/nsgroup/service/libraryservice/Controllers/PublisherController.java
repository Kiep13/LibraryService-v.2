package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.Publishers;
import com.nsgroup.service.libraryservice.Repsoitories.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class PublisherController {

    @Autowired
    PublisherRepository publisherRepository;

    @RequestMapping(value = {"/publishers"}, method = RequestMethod.GET)
    public @ResponseBody
    Iterable<Publishers> getAllPublishers() {
        return publisherRepository.findAll();
    }

    @RequestMapping(value = {"/publisher-add"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addPublisher(@RequestBody Publishers publisher) {
        publisherRepository.save(publisher);
    }

    @RequestMapping(value = {"/publisher-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editPublisher(@RequestBody Publishers publisher) {
        publisherRepository.save(publisher);
    }

    @RequestMapping(value = {"publisher-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deletePublisher(@PathVariable("id") Long id) {
        publisherRepository.deleteById(id);
    }

}
