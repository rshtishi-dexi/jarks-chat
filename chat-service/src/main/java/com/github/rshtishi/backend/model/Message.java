package com.github.rshtishi.backend.model;

import com.github.rshtishi.backend.model.enums.MessageStatus;
import com.github.rshtishi.backend.model.enums.MessageType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class Message {

    private String id;
    private String content;
    private String sender;
    private String recipient;
    private Date created;
    private MessageType type;
    private MessageStatus status;

}
