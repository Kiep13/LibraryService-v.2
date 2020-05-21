package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Libraries;
import org.springframework.data.repository.CrudRepository;

public interface LibraryRepository extends CrudRepository<Libraries, Long> {
}
