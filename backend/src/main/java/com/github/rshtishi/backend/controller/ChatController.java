package com.github.rshtishi.backend.controller;

import com.github.rshtishi.backend.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sentMessage(@Payload final Message message) {
        return message;
    }

    @MessageMapping("/chat.connect")
    @SendTo("/topic/public")
    public Message connect(@Payload final Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        return message;
    }

}
