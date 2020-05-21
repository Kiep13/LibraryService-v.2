package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.Books;
import com.nsgroup.service.libraryservice.Repsoitories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("http://localhost:3000")
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @RequestMapping(value = {"/books"}, method = RequestMethod.GET)
    public @ResponseBody
    Iterable<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    @RequestMapping(value = {"/book-add"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addBook(@RequestBody Books book){
        bookRepository.save(book);
    }

    @RequestMapping(value = {"/book-edit"}, method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void editBook(@RequestBody Books book){
        bookRepository.save(book);
    }

    @RequestMapping(value = {"/book-delete/{id}"}, method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteBook(@PathVariable("id") Long id){
        bookRepository.deleteById(id);
    }

}
