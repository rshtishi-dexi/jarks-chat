package io.dexi.service;

import io.dexi.entity.User;
import io.dexi.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    UserService userService;
    @Mock
    UserRepository userRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void when_userHashIsEmpty_thenFetchUserListReturnEmptyList() {
        //setup
        when(userRepository.findAll()).thenReturn(new ArrayList<>());
        //execute
        List<User> userList = userService.fetchUserList();
        //verify
        assertThat(userList).hasSize(0);
    }

    @Test
    void when_userIsValid_then_saveUserSucceed() {
        //setup
        User user = new User("test", "");
        when(userRepository.save(user)).thenReturn(user);
        //execute
        User userSaved = userService.saveUser(user);
        //verify
        assertThat(user).isNotNull()
                .isEqualTo(user);
    }

    @Test
    void when_usernameIsValid_then_fetchByUsernameWillReturnUser(){
        //setup
        User user = new User("test", "");
        when(userRepository.findById(user.getUsername())).thenReturn(Optional.of(user));
        //execute
        User userFetched = userService.fetchUserByUsername(user.getUsername());
        //verify
        assertThat(user).isNotNull()
                .isEqualTo(user);
    }

    @Test
    void when_usernameIsValid_then_deleteByUsernameWillSucceed(){
        //setup
        User user = new User("test", "");
        doNothing().when(userRepository).deleteById(user.getUsername());
        //execute
        userService.deleteUserByUsername(user.getUsername());
        //verify
        verify(userRepository,times(1)).deleteById(user.getUsername());
    }


}