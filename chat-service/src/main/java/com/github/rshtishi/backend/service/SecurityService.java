package com.github.rshtishi.backend.service;

import com.github.rshtishi.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SecurityService {

    private List<User> db = new ArrayList<>();

    public void addUser(User user) {
        db.add(user);
    }

    public User findUserByUsername(String username) {
        return db.stream().filter(user -> user.getUsername().equalsIgnoreCase(username)).findAny().get();
    }
}
