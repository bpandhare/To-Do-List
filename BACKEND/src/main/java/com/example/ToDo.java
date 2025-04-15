package com.example;

public class ToDo {
    
    private Long id;
    private String task;

    public ToDo() {}

    public ToDo(Long id, String task) {
        this.id = id;
        this.task = task;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTask() { return task; }
    public void setTask(String task) { this.task = task; }
}
