package com.github.rshtishi.backend.security;

import com.github.rshtishi.backend.model.User;
import com.github.rshtishi.backend.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityEndpoint {

    @Autowired
    private SecurityService securityService;

    @CrossOrigin
    @PostMapping("/signin")
    public boolean authenticate(@RequestBody User user){
        User dbUser = securityService.findUserByUsername(user.getUsername());
        if(dbUser==null || !dbUser.getPassword().equals(user.getPassword())){
            return false;
        }
        return true;
    }

    @CrossOrigin
    @PostMapping("/register")
    public boolean register(@RequestBody User user){
        securityService.addUser(user);
        return true;
    }
}
