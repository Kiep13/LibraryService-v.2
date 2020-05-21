package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Genres;
import org.springframework.data.repository.CrudRepository;

public interface GenreRepository extends CrudRepository<Genres, Long> {
}
