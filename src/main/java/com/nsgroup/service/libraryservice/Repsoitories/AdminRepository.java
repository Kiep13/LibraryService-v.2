package com.nsgroup.service.libraryservice.Repsoitories;

import com.nsgroup.service.libraryservice.Models.Admins;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface AdminRepository extends CrudRepository<Admins, Long> {
    @Modifying
    @Transactional
    @Query(value = "SELECT a FROM Admins AS a WHERE a.login = :login AND a.password = :password")
    Iterable<Admins> findByLoginPaAndPassword(@Param("login") String login, @Param("password") String password);

}
