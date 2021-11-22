package pl.managio.server.service.team;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.managio.server.domain.Team;
import pl.managio.server.domain.TeamMember;
import pl.managio.server.domain.User;
import pl.managio.server.model.TeamDetailsModel;
import pl.managio.server.model.TeamModel;
import pl.managio.server.model.UserModel;
import pl.managio.server.repository.TeamMemberRepository;
import pl.managio.server.repository.TeamRepository;
import pl.managio.server.repository.UserRepository;
import pl.managio.server.service.authentication.AuthenticationService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    public Optional<TeamModel> createTeam(String name, String photo) {
        Team t = new Team(name);
        User user = authenticationService.getCurrentUser();
        t.setOwner(user);
        t.setPhoto(photo);
        try {
            teamRepository.save(t);
            TeamMember teamMember = new TeamMember(t, user);
            teamMemberRepository.save(teamMember);
            return Optional.of(new TeamModel(t));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    //    TODO: verify if needed
    @Override
    public Optional<TeamModel> createTeam(String name, String photo, List<User> users) {
        return null;
    }

    @Override
    public boolean deleteTeam(Long id) {
        User user = authenticationService.getCurrentUser();
        var team = teamRepository.findById(id);
        if (team.isEmpty() || team.get().getOwner() != user) {
            return false;
        }
        teamRepository.delete(team.get());
        return true;
    }

    @Override
    public Optional<TeamDetailsModel> addMembers(Long id, Set<String> emails) {
        User user = authenticationService.getCurrentUser();
        var team = teamRepository.findById(id);
        if (team.isEmpty() || team.get().getOwner() != user) {
            return Optional.empty();
        }

        emails.forEach(email -> {
            var u = userRepository.findByEmail(email);
            if (u.isPresent()) {
                TeamMember m = new TeamMember(team.get(), u.get());
                teamMemberRepository.save(m);
            }
        });
        return teamRepository.findById(id).map(TeamDetailsModel::new);
    }

    @Override
    public List<UserModel> getMembers(Long id) {
        var team = teamRepository.findById(id);
        return team.map(x -> teamMemberRepository.findAllByTeam(x).stream()
                        .filter(teamMember -> !teamMember.isDeleted())
                        .map(t -> new UserModel(t.getUser()))
                        .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }

    @Override
    public boolean deleteMember(Long teamId, Long userId) {
        User owner = authenticationService.getCurrentUser();
        var team = teamRepository.findById(teamId);
        var user = userRepository.findById(userId);
        if (team.isEmpty() || user.isEmpty() || team.get().getOwner() != owner) {
            return false;
        }
        var member = teamMemberRepository.findByTeamAndUser(team.get(), user.get());

        try {
            member.get().setDeleted(true);
            teamMemberRepository.save(member.get());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<TeamModel> getTeams() {
        User user = authenticationService.getCurrentUser();
        return user.getTeamUsers().stream()
                .map(t -> new TeamModel(t.getTeam()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TeamDetailsModel> getTeam(Long id) {
        return teamRepository.findById(id).map(TeamDetailsModel::new);
    }

    @Override
    public Optional<TeamModel> updateTeam(Long id, String name, String photo) {
        User user = authenticationService.getCurrentUser();
        var team = teamRepository.findById(id);
        if (team.isEmpty() || team.get().getOwner() != user) {
            return Optional.empty();
        }

        Team t = team.get();
        t.setName(name);
        t.setPhoto(photo);
        try {
            teamRepository.save(t);
            return Optional.of(new TeamModel(t));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

}