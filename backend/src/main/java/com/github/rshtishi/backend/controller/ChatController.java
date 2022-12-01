package com.github.rshtishi.backend.controller;

import com.github.rshtishi.backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message/public") // url -> /app/message/public
    @SendTo("/jarks/public")
    public Message receivePublicMessage(@Payload final Message message) {
        return message;
    }

    @MessageMapping("/message")  // url -> /app/message/username
    public Message receiveMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSend(message.getRecipient(), message);
        return message;
    }

    /*
    @MessageMapping("/chat.connect")
    @SendTo("/topic/public")
    public Message connect(@Payload final Message message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        return message;
    }

     */

}
