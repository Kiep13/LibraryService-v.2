package com.nsgroup.service.libraryservice.Models;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Entity
public class BookFund {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="book_id", nullable = false)
    private Books book;

    @ManyToOne
    @JoinColumn(name = "library_id", nullable = false)
    private Libraries library;

    private Integer amount;

    public BookFund() {
    }

    public BookFund(Books book, Libraries library, Integer amount) {
        this.book = book;
        this.library = library;
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Books getBook() {
        return book;
    }

    public void setBook(Books book) {
        this.book = book;
    }

    public Libraries getLibrary() {
        return library;
    }

    public void setLibrary(Libraries library) {
        this.library = library;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
