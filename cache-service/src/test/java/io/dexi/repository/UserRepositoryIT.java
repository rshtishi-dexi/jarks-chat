package io.dexi.repository;

import io.dexi.config.TestRedisConfiguration;
import io.dexi.entity.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {TestRedisConfiguration.class})
class UserRepositoryIT {

    @Autowired
    private UserRepository userRepository;

    @Test
    void test() {
        //setup
        User user = new User("test", "");
        //execute
        User savedUser = userRepository.save(user);
        //verify
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo(user.getUsername());
    }
}
