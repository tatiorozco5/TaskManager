package com.taskmanager.service;

import com.taskmanager.dto.TaskDTO;
import com.taskmanager.model.Person;
import com.taskmanager.model.Task;
import com.taskmanager.repository.PersonRepository;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.HashMap;
import java.util.Comparator;
import java.util.concurrent.atomic.AtomicLong;


import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PersonRepository personRepository;

    public List<TaskDTO> getAllTasksWithAssigneeName() {
        List<Task> tasks = taskRepository.findAll();

        return tasks.stream().map(task -> {
            TaskDTO dto = new TaskDTO();
            dto.setId(task.getId());
            dto.setTitle(task.getTitle());
            dto.setDescription(task.getDescription());
            dto.setCompleted(task.isCompleted());
            dto.setAssigneeName(
                    task.getAssignee() != null ? task.getAssignee().getName() : "Sin asignar"
            );
            return dto;
        }).collect(Collectors.toList());
    }



    public Task save(Task task) {
        if (task.getAssignee() == null) {
            List<Person> people = personRepository.findAll();

            Map<Person, Long> taskCountMap = new HashMap<>();
            AtomicLong minTasks = new AtomicLong(Long.MAX_VALUE);

            for (Person person : people) {
                long count = person.getTasks() != null ? person.getTasks().size() : 0;
                taskCountMap.put(person, count);
                if (count < minTasks.get()) {
                    minTasks.set(count);
                }
            }



            List<Person> candidates = taskCountMap.entrySet().stream()
                    .filter(entry -> entry.getValue() == minTasks.get())
                    .map(Map.Entry::getKey)
                    .toList();

            Person bestCandidate = candidates.stream()
                    .max(Comparator.comparingInt(p ->
                            p.getTasks().stream().mapToInt(Task::getStoryPoints).sum()))
                    .orElse(null);

            task.setAssignee(bestCandidate);
        }

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID: " + id));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setStoryPoints(updatedTask.getStoryPoints());
        existingTask.setComments(updatedTask.getComments()); // si tienes campo comments

        return taskRepository.save(existingTask);
    }

    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
}
