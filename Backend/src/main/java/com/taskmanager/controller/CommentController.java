package com.taskmanager.controller;

import com.taskmanager.model.Comment;
import com.taskmanager.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/tasks/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{taskId}")
    public List<Comment> getCommentsByTask(@PathVariable Long taskId) {
        return commentService.getCommentsByTaskId(taskId);
    }

    @PostMapping("/{taskId}")
    public Comment addComment(@PathVariable Long taskId, @RequestBody Map<String, String> body) {
        String content = body.get("content");
        return commentService.addCommentToTask(taskId, content);
    }
}
