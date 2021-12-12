package pl.managio.server.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Attachment;

@Repository
public interface AttachmentRepository extends CrudRepository<Attachment, Long> {

    @Query("select a.name from attachment a where a.path like %:path")
    String getAttachmentName(@Param("path") String path);

}
