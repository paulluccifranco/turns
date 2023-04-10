package com.back.repository;

import com.back.model.PlatformParameter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformParameterRepository extends JpaRepository<PlatformParameter, Long> {

    public PlatformParameter findByKey(String key);
}
