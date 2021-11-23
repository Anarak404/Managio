package pl.managio.server.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "team_member")
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TeamMember {

    @EmbeddedId
    TeamMemberKey id;

    @CreationTimestamp
    Timestamp joinDateTime;

    boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("team")
    @JoinColumn(name = "team_id")
    Team team;

    public TeamMember(Team team, User user) {
        this.user = user;
        this.team = team;
        this.id = new TeamMemberKey(team.getId(), user.getId());
        this.joinDateTime = Timestamp.valueOf(LocalDateTime.now());
        this.isDeleted = false;
    }

}
