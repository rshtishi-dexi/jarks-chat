package io.dexi.repository;

import io.dexi.entity.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, String> {

    List<Message> findMessagesBySender(String sender);

    List<Message> findMessagesByRecipient(String recipient);
}
