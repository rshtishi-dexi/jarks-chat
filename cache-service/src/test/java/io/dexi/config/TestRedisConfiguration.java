package io.dexi.config;

import org.springframework.boot.test.context.TestConfiguration;
import redis.clients.jedis.JedisPool;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@TestConfiguration
public class TestRedisConfiguration {

    private RedisServer redisServer;
    private JedisPool jedisPool;

    public TestRedisConfiguration(){
        this.redisServer = new RedisServer(6379);
    }

    @PostConstruct
    public void postConstruct() {
        redisServer.start();
    }

    @PreDestroy
    public void preDestroy() {
        redisServer.stop();
    }
}
