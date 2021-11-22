package pl.managio.server.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity(name = "team")
@NoArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String name;

    @Column
    String photo;

    @CreationTimestamp
    Timestamp creationDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner", nullable = false)
    User owner;

    @OneToMany(mappedBy = "team")
    List<TeamMember> users;

    public Team(String name) {
        this.name = name;
    }

}
