package io.dexi.controller;

import io.dexi.entity.User;
import io.dexi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> all() {
        return userService.fetchUserList();
    }

    @GetMapping("/{username}")
    public User one(@PathVariable String username) {
        return userService.fetchUserByUsername(username);
    }

    @PostMapping
    public User newUser(@RequestBody User newUser) {
        return userService.saveUser(newUser);
    }

    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUserByUsername(username);
    }

}
