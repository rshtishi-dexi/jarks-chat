package io.dexi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dexi.entity.User;
import io.dexi.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    UserService userService;

    @Test
    void when_userHashIsEmpty_then_allWillReturnEmptyList() throws Exception {
        //setup
        when(userService.fetchUserList()).thenReturn(new ArrayList<>());
        //execute
        mockMvc.perform(MockMvcRequestBuilders.get("/users")
                        .accept(MediaType.APPLICATION_JSON))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("[]")));
    }

    @Test
    void when_usernameInPathIsValid_then_oneWillReturnUser() throws Exception {
        //setup
        User user = new User("test", "");
        when(userService.fetchUserByUsername(user.getUsername())).thenReturn(user);
        //execute
        mockMvc.perform(MockMvcRequestBuilders.get("/users/test")
                        .accept(MediaType.APPLICATION_JSON))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(user.getUsername())));
    }

    @Test
    void when_userInRequestBodyIsValid_then_newUserIsCreated() throws Exception {
        //setup
        User user = new User("test", "");
        when(userService.saveUser(user)).thenReturn(user);
        ObjectMapper mapper = new ObjectMapper();
        String userJsonStr = mapper.writeValueAsString(user);
        //execute
        mockMvc.perform(MockMvcRequestBuilders.post("/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJsonStr))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(userJsonStr)));
    }

    @Test
    void when_usernameInPathIsValid_then_deleteByUserWillSucceed() throws Exception {
        //setup
        User user = new User("test","");
        doNothing().when(userService).deleteUserByUsername(user.getUsername());
        //execute
        mockMvc.perform(MockMvcRequestBuilders.delete("/users/test")
                .accept(MediaType.APPLICATION_JSON))
                //verify
                .andDo(print())
                .andExpect(status().isOk());
    }
}