package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.BookFund;
import com.nsgroup.service.libraryservice.Repsoitories.BookFundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class BookFundController {

    @Autowired
    BookFundRepository bookFundRepository;

    @RequestMapping(value = {"/bookfund"}, method = RequestMethod.GET)
    public @ResponseBody
    Iterable<BookFund> getBookFund() {
        return bookFundRepository.findAll();
    }

    @RequestMapping(value = {"/bookfund-add"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addBookFund(@RequestBody BookFund bookFund) {
        bookFundRepository.save(bookFund);
    }

    @RequestMapping(value = {"/bookfund-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editBookFund(@RequestBody BookFund bookFund) {
        bookFundRepository.save(bookFund);
    }

    @RequestMapping(value = {"/bookfund-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteBookFund(@PathVariable("id") Long id) {
        bookFundRepository.deleteById(id);
    }

}
