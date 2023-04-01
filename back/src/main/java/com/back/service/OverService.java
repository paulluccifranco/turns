package com.back.service;

import com.back.model.Over;

import java.util.List;

public interface OverService {

    public List<Over> getAll();
    public Over getLast();
    public void save(Over over);
}
