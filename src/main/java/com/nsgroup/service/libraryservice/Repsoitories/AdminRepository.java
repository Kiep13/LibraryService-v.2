package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Admins;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admins, Long> {
}
