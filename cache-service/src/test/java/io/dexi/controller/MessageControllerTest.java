package io.dexi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dexi.entity.Message;
import io.dexi.service.MessageService;
import io.dexi.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(MessageController.class)
class MessageControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    MessageService messageService;

    @Test
    public void when_messageHashIsEmpty_then_messageBySenderWillBeEmpty() throws Exception {
        //setup
        String sender = "dummy-sender";
        when(messageService.fetchMessagesBySender(sender)).thenReturn(Collections.emptyList());
        //execute
        mockMvc.perform(MockMvcRequestBuilders.get("/messages")
                        .param("sender", sender)
                        .accept(MediaType.APPLICATION_JSON))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("[]")));
    }

    @Test
    public void when_messageHashIsEmpty_then_messageByRecipeintWillBeEmpty() throws Exception {
        //setup
        String recipient = "dummy-sender";
        when(messageService.fetchMessagesBySender(recipient)).thenReturn(Collections.emptyList());
        //execute
        mockMvc.perform(MockMvcRequestBuilders.get("/messages")
                        .param("recipient", recipient)
                        .accept(MediaType.APPLICATION_JSON))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("[]")));
    }

    @Test
    public void when_messageInRequestBodyIsValid_then_newUserIsCreated() throws Exception {
        //setup
        Message message = Message.builder().id("dummy-id")
                .content("hello")
                .sender("dummy-sender")
                .recipient("dummy-recipient")
                .build();
        when(messageService.saveMessage(any())).thenReturn(message);
        ObjectMapper mapper = new ObjectMapper();
        String messageJsonStr = mapper.writeValueAsString(message);
        //execute
        mockMvc.perform(MockMvcRequestBuilders.post("/messages")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(messageJsonStr))
                //verify
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString(messageJsonStr)));
    }

}