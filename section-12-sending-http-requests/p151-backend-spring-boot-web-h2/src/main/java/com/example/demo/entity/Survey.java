package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Survey {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String rating;
}
