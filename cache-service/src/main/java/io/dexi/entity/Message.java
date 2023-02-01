package io.dexi.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.util.Date;

@RedisHash
@Builder
@Getter
@Setter
public class Message {

    @Id
    private String id;
    private String content;
    @Indexed
    private String sender;
    @Indexed
    private String recipient;
    private Date created;

}