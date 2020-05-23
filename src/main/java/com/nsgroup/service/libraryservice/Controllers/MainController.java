package com.nsgroup.service.libraryservice.Controllers;

import com.nsgroup.service.libraryservice.Models.*;
import com.nsgroup.service.libraryservice.Repsoitories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class MainController {

    @Autowired
    AdminRepository adminRepository;

    @RequestMapping(value = { "/registration"}, method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public void addAdmin(@RequestBody Admins admin) {
        adminRepository.save(admin);
    }

    @RequestMapping(value = { "/log-in"}, method = RequestMethod.PUT)
    public @ResponseBody Iterable<Admins> logIn(@RequestBody Admins admin) {
        return adminRepository.findByLoginPaAndPassword(admin.getLogin(), admin.getPassword());
    }

}
