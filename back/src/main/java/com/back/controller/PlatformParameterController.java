package com.back.controller;

import com.back.model.PlatformParameter;
import com.back.service.PlatformParameterService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/platform-parameter")
@AllArgsConstructor
public class PlatformParameterController {

    private final PlatformParameterService platformParameterService;

    @GetMapping("/{key}")
    public PlatformParameter getPlatformParameter(@PathVariable("key") String key) {
        return platformParameterService.getPlatformParameter(key);
    }

    @PostMapping("")
    public void savePlatformParameter(@RequestBody PlatformParameter platformParameter){
        platformParameterService.savePlatformParameter(platformParameter);
    }
}
