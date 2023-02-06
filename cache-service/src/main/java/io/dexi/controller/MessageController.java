package io.dexi.controller;

import io.dexi.entity.Message;
import io.dexi.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping(params = {"sender"})
    public List<Message> messagesBySender(@RequestParam String sender) {
        return messageService.fetchMessagesBySender(sender);
    }

    @GetMapping(params = {"recipient"})
    public List<Message> messagesByRecipient(@RequestParam String recipient) {
        return messageService.fetchMessagesByRecipient(recipient);
    }

    @PostMapping
    public Message newMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }
}
