package com.back.serviceImpl;

import com.back.model.PlatformParameter;
import com.back.repository.PlatformParameterRepository;
import com.back.service.PlatformParameterService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PlatformParameterServiceImpl implements PlatformParameterService {

    private final PlatformParameterRepository platformParameterRepository;

    @Override
    public PlatformParameter getPlatformParameter(String key) {
        return platformParameterRepository.findByKey(key);
    }

    @Override
    public void savePlatformParameter(PlatformParameter platformParameter) {
        PlatformParameter previousParameter = platformParameterRepository.findByKey(platformParameter.getKey());
        if(previousParameter != null) platformParameter.setId(previousParameter.getId());
        platformParameterRepository.save(platformParameter);
    }
}
