package pl.managio.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Label;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

    @Query("select l from label l where l.name = :name")
    Label getLabelByName(@Param("name") String name);

}
