package io.dexi.repository;

import io.dexi.config.TestRedisConfiguration;
import io.dexi.entity.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {TestRedisConfiguration.class})
class UserRepositoryIT {

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    void when_userIsValid_then_saveWillSucceed() {
        //setup
        User user = new User("test", "");
        //execute
        User savedUser = userRepository.save(user);
        //verify
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    void when_userWithUsernameIsPresent_findByIdWillReturnUser() {
        //setup
        User user = new User("test", "");
        user = userRepository.save(user);
        //execute
        User userFound = userRepository.findById(user.getUsername()).get();
        //verify
        assertThat(userFound).isNotNull();
        assertThat(userFound.getUsername()).isEqualTo(userFound.getUsername());
    }

    @Test
    void when_userWithUsernameIsPresent_deleteByIdWillSucceed() {
        //setup
        User user = new User("test", "");
        user = userRepository.save(user);
        //execute
        userRepository.deleteById(user.getUsername());
        //verify
        Optional<User> possibleUser = userRepository.findById(user.getUsername());
        assertThat(possibleUser.isPresent()).isEqualTo(false);
    }

    @Test
    void when_userHashIsEmpty_findAllWillReturnEmptyList() {
        //execute
        List<User> userList = userRepository.findAll();
        //verify
        assertThat(userList).hasSize(0);
    }
}
