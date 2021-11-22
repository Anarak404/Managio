package pl.managio.server.model;

import lombok.Data;
import pl.managio.server.domain.Team;

@Data
public class TeamModel {

    String name;
    String photo;
    UserModel owner;

    public TeamModel(Team team) {
        this.name = team.getName();
        this.photo = team.getPhoto();
        this.owner = new UserModel(team.getOwner());
    }

}
