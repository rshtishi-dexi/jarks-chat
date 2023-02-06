package io.dexi.service;

import io.dexi.entity.Message;
import io.dexi.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository repository;

    public List<Message> fetchMessagesBySender(String sender) {
        /**
         * TO DO
         * ADD validations
         */
        return repository.findMessagesBySender(sender);
    }

    public List<Message> fetchMessageByRecipient(String recipient) {
        /**
         * TO DO
         * Add validations
         */
        return repository.findMessagesByRecipient(recipient);
    }

    public Message saveMessage(Message message) {
        /**
         * TO DO
         * Add validations
         */
        return repository.save(message);
    }


    public List<Message> fetchMessagesByRecipient(String recipient) {
        /**
         * TO DO
         * Add validations
         */
        return repository.findMessagesByRecipient(recipient);
    }
}
