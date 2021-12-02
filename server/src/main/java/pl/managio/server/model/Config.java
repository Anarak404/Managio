package pl.managio.server.model;

import lombok.Value;

import java.util.List;

@Value
public class Config {
    List<String> priorities;
}
