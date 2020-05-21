package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Authors;
import org.springframework.data.repository.CrudRepository;

public interface AuthorRepository extends CrudRepository<Authors, Long> {
}
