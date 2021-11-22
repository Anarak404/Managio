package pl.managio.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class TeamMemberKey implements Serializable {

    @Column(name = "team_id")
    Long team;

    @Column(name = "user_id")
    Long user;

}
