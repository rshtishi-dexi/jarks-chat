package com.github.rshtishi.backend.model;

import com.github.rshtishi.backend.enums.MessageType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class Message {

    private MessageType type;
    private String content;
    private String sender;
    private String time;
}
