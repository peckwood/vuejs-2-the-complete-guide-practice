package com.example.demo.controller;

import com.example.demo.dao.ISurveyDAO;
import com.example.demo.entity.Survey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class AppController {
    @Autowired
    private ISurveyDAO iSurveyDAO;

    @PostMapping("save-survey")
    public Map<String, Object> saveSurvey(@RequestBody Survey survey){
        iSurveyDAO.save(survey);
        Map<String, Object> result = new HashMap<>();
        result.put("code", 0);
        return result;
    }

    @GetMapping("get-all-survey")
    public List<Survey> saveSurvey(){
        return iSurveyDAO.findAll();
    }

    @GetMapping("hello")
    public Map<String, Object> greeting(){
        Map<String, Object> result = new HashMap<>();
        result.put("code", "123");
        return result;
    }
}
