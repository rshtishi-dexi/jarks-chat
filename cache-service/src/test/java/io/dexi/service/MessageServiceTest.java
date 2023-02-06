package io.dexi.service;

import io.dexi.entity.Message;
import io.dexi.repository.MessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @InjectMocks
    private MessageService messageService;
    @Mock
    private MessageRepository messageRepository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void when_messageIsValid_then_saveMessageIsSuccess(){
        //setup
        String id = "dummy-id";
        Message message = Message.builder().id("dummy-id")
                .content("hello")
                .sender("dummy-sender")
                .recipient("dummy-recipient")
                .build();
        when(messageRepository.save(message)).thenReturn(message);
        //execute
        Message result = messageService.saveMessage(message);
        //verify
        assertThat(result).isInstanceOf(Message.class)
                .isEqualToComparingFieldByField(message);
    }

    @Test
    void when_senderIsValid_then_fetchBySenderWillReturnSenderMessages(){
        //setup
        String sender = "dummy-sender";
        Message message = Message.builder().id("dummy-id")
                .content("hello")
                .sender(sender)
                .recipient("dummy-recipient")
                .build();
        when(messageRepository.findMessagesBySender(sender)).thenReturn(List.of(message));
        //execute
        List<Message> result = messageService.fetchMessagesBySender(sender);
        //verify
        assertThat(result).isNotEmpty()
                .containsExactlyElementsOf(List.of(message));
    }

    @Test
    void when_recipientIsValid_then_fetchByRecipientWillReturnRecipientMEssages(){
        //setup
        String recipient = "dummy-recipeient";
        Message message = Message.builder().id("dummy-id")
                .content("hello")
                .sender("dummy-sender")
                .recipient(recipient)
                .build();
        when(messageRepository.findMessagesByRecipient(recipient)).thenReturn(List.of(message));
        //execute
        List<Message> result = messageService.fetchMessagesByRecipient(recipient);
        //verify
        assertThat(result).isNotEmpty()
                .containsExactlyElementsOf(List.of(message));
    }

}