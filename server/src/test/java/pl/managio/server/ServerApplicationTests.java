package pl.managio.server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import pl.managio.server.domain.User;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class ServerApplicationTests {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationService authenticationService;

    @TestConfiguration
    static class Config {
        @Bean
        @Primary
        public UserRepository getUserRepository() {
            var userRepository = mock(UserRepository.class);
            when(userRepository.save(any(User.class))).thenAnswer(e -> {
                var user = (User) e.getArgument(0);
                user.setId(5L);
                return user;
            });
            return userRepository;
        }
    }

    @Test
    void testRegister_validUserData_createUser() {
        String name = "Ania", email = "ania4@op.pl", password = "Test123!";

        var testUser = authenticationService.register(name, email, password);
        assertNotNull(testUser);
        assertTrue(testUser.isPresent());
        assertEquals(testUser.get().getEmail(), email);
        assertEquals(testUser.get().getName(), name);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void contextLoads() {
    }

}
