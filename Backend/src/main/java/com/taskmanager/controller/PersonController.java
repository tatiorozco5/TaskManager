package com.taskmanager.controller;

import org.springframework.http.HttpStatus;
import com.taskmanager.model.Person;
import com.taskmanager.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/persons")
@CrossOrigin(origins = "*")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping
    public List<Person> getAllPersons() {
        return personService.findAll();
    }



    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Person> create(@RequestBody Person person) {
        return ResponseEntity.ok(personService.save(person));
    }






    @GetMapping("/least-busy")
    public Person getLeastBusy() {
        return personService.findLeastBusyPerson();
    }
}

