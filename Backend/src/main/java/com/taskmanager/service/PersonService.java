package com.taskmanager.service;

import com.taskmanager.model.Person;
import com.taskmanager.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public Person getPersonById(Long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada con ID: " + id));
    }

    public Person findLeastBusyPerson() {
        return personRepository.findAll()
                .stream()
                .min(Comparator.comparingInt(p -> p.getTasks().size()))
                .orElseThrow();
    }

    public Person save(Person person) {
        return personRepository.save(person);
    }

}
