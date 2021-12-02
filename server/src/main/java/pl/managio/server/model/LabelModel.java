package pl.managio.server.model;

import lombok.Value;
import pl.managio.server.domain.Label;

@Value
public class LabelModel {

    String label;
    boolean exist;

    public LabelModel(Label label) {
        this(label.getName(), true);
    }

    public LabelModel(String label, boolean exist) {
        this.label = label;
        this.exist = exist;
    }

}
