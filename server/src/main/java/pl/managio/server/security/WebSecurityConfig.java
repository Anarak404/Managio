package pl.managio.server.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final JSONAuthFilter jsonAuthFilter;

    @Bean
    AuthenticationManager getAuthenticationManager() throws Exception {
        return this.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().configurationSource(request -> {
                    CorsConfiguration cors = new CorsConfiguration().applyPermitDefaultValues();
                    cors.addAllowedOriginPattern("http://localhost:3000");
                    cors.setAllowCredentials(true);
                    cors.addAllowedMethod(HttpMethod.PUT);
                    return cors;
                })
                    .and()
                .addFilterBefore(jsonAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> httpServletResponse.setStatus(200))
                    .and()
                .exceptionHandling().accessDeniedHandler((httpServletRequest, httpServletResponse, e) -> httpServletResponse.setStatus(403))
                .authenticationEntryPoint((httpServletRequest, httpServletResponse, e) -> httpServletResponse.setStatus(401))
                    .and()
                .authorizeRequests()
                .antMatchers("/login", "/register").permitAll()
                .anyRequest().authenticated();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
