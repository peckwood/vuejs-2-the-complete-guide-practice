package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GreetingController {
    @GetMapping("hello")
    public Map<String, Object> greeting(){
        Map<String, Object> result = new HashMap<>();
        result.put("code", "123");
        return result;
    }
}
