package io.dexi.service;

import io.dexi.entity.User;
import io.dexi.exception.UserNotFound;
import io.dexi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> fetchUserList(){
        return userRepository.findAll();
    }

    public User saveUser(User user){
        /**
         * TO DO
         * Add validations
         */
        return userRepository.save(user);
    }

    public User fetchUserByUsername(String username){
        /**
         * TO DO
         * Add validations
         */
        return userRepository.findById(username).orElseThrow(UserNotFound::new);
    }

    public void deleteUserByUsername(String username){
        /**
         * TO DO
         * Add validations
         */
        userRepository.deleteById(username);
    }

}
