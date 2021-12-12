package pl.managio.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.managio.server.domain.Attachment;

@Repository
public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
}
