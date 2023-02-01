package io.dexi.repository;

import io.dexi.config.TestRedisConfiguration;
import io.dexi.entity.Message;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {TestRedisConfiguration.class})
class MessageRepositoryIT {

    @Autowired
    private MessageRepository messageRepository;

    @BeforeEach
    void setUp(){
        //setup
        String id = "dummy-id";
        Message message = Message.builder().id(id)
                .content("dummy message")
                .sender("dummy-sender")
                .recipient("dummy-recipient")
                .created(new Date()).build();
        //execute
        Message savedUser = messageRepository.save(message);
    }

    @AfterEach
    void tearDown(){
        messageRepository.deleteAll();
    }

    @Test
    void when_messageIsValid_then_saveWillSucceed() {
        //setup
        String id = "dummy-id";
        Message message = Message.builder().id(id)
                .content("dummy message")
                .sender("dummy-sender")
                .recipient("dummy-recipient")
                .created(new Date()).build();
        //execute
        Message savedUser = messageRepository.save(message);
        //verify
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isEqualTo(id);
    }

    @Test
    public void when_messagesWithSenderIsPresent_then_findBySenderWillReturnMessages(){
        //setup
        String sender = "dummy-sender";
        //execute
        List<Message> messages = messageRepository.findMessagesBySender(sender);
        //verify
        assertThat(messages).isNotEmpty();
        assertThat(messages).hasSize(1);
    }

    @Test
    public void when_messagesWithRecipientIsPresent_then_findByRecipientWillReturnMessages(){
        //setup
        String recipient = "dummy-recipient";
        //execute
        List<Message> messages = messageRepository.findMessagesByRecipient(recipient);
        //verify
        assertThat(messages).isNotEmpty();
        assertThat(messages).hasSize(1);
    }

}