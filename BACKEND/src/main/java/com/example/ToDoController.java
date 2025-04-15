package com.example;

import com.example.ToDo;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access
@RequestMapping("/api/todos")
public class ToDoController {

    private List<ToDo> todoList = new ArrayList<>();
    private Long idCounter = 1L;

    @GetMapping
    public List<ToDo> getAllTodos() {
        return todoList;
    }

    @PostMapping
    public ToDo addTodo(@RequestBody ToDo todo) {
        todo.setId(idCounter++);
        todoList.add(todo);
        return todo;
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoList.removeIf(t -> t.getId().equals(id));
    }
}
