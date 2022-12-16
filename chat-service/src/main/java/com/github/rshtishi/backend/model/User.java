package com.github.rshtishi.backend.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class User {

    private String userId;
    private String username;
    private Date registerDate;
    private String password;
    private byte[] image;

}
