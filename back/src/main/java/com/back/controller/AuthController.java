package com.back.controller;

import com.back.modelDto.LoginRequestDto;
import com.back.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", methods = { RequestMethod.POST })
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    // Usuario y contraseña quemados por ahora
    private static final String HARD_USERNAME = "admin";
    private static final String HARD_PASSWORD = "padleCentenario128";

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequestDto loginRequestDto) {

        if (HARD_USERNAME.equals(loginRequestDto.getUsername())
                && HARD_PASSWORD.equals(loginRequestDto.getPassword())) {

            String jwt = jwtUtil.generateToken(loginRequestDto.getUsername());

            Map<String, Object> body = new HashMap<>();
            body.put("token", jwt);
            body.put("username", loginRequestDto.getUsername());

            return ResponseEntity.ok(body);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}

