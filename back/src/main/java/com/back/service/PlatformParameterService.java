package com.back.service;

import com.back.model.PlatformParameter;

public interface PlatformParameterService {

    public PlatformParameter getPlatformParameter(String key);
    public void savePlatformParameter(PlatformParameter platformParameter);
}
