package com.taskmanager.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean completed = false;
    private int storyPoints;

    @Enumerated(EnumType.STRING)
    private TaskStatus status = TaskStatus.SIN_INICIAR;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments;


    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonBackReference
    private Person assignee;



}
