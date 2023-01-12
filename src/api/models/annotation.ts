import { CRUD } from "@/api/mixins/mixins";

export interface AnnotationLabelProps {
  id?: number;
  name?: string;
  probable_cause?: string;
  label?: string;
  process?: string;
  created_at?: string;
}

class AnnotationLabel extends CRUD {
  data: AnnotationLabelProps;
  old_data: AnnotationLabelProps;

  constructor(annotation: AnnotationLabelProps) {
    super();
    this.data = {
      id: annotation.id ?? -1,
      name: annotation.name,
      probable_cause: annotation.probable_cause,
      label: annotation.label,
      process: annotation.process,
      created_at: annotation.created_at
    }

    this.old_data = { ...this.data }
  }
}

AnnotationLabel.prototype.path = "/annotations/";
export default AnnotationLabel;
