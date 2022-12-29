package io.dexi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash
@Data
@AllArgsConstructor
public class User {

    @Id
    private String username;
    @Indexed
    private String imageSource;
}
