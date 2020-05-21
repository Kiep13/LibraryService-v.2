package com.nsgroup.service.libraryservice.Models;

import javax.persistence.*;

@Entity
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name="author_id", nullable=false)
    private Authors author;

    @ManyToOne
    @JoinColumn(name="publisher_id", nullable=false)
    private Publishers publisher;

    @ManyToOne
    @JoinColumn(name="genre_id", nullable=false)
    private Genres genre;

    private Integer amount_pages, year;

    public Books() {
    }

    public Books(String title, Authors author, Publishers publisher, Genres genre, Integer amount_pages, Integer year) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.genre = genre;
        this.amount_pages = amount_pages;
        this.year = year;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Authors getAuthor() {
        return author;
    }

    public void setAuthor(Authors author) {
        this.author = author;
    }

    public Publishers getPublisher() {
        return publisher;
    }

    public void setPublisher(Publishers publisher) {
        this.publisher = publisher;
    }

    public Genres getGenre() {
        return genre;
    }

    public void setGenre(Genres genre) {
        this.genre = genre;
    }

    public Integer getAmount_pages() {
        return amount_pages;
    }

    public void setAmount_pages(Integer amount_pages) {
        this.amount_pages = amount_pages;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }
}
