package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Admins;
import com.nsgroup.service.libraryservice.Models.Genres;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface GenreRepository extends CrudRepository<Genres, Long> {
}
