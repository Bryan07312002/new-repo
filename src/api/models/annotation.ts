import { CRUD } from "@/api/mixins/mixins";

export interface AnnotationLabelProps {
  id?: number;
  created_at?: String;
  updated_at?: String;
  name?: String;
  probable_cause?: String;
  label?: String;
  process?: String;
}

class AnnotationLabel extends CRUD {
  data: Object;
  old_data: Object;

  constructor(annotation: AnnotationLabelProps) {
    super();
    this.data = {
      id: annotation.id ?? -1,
      name: annotation.name ?? "",
      probable_cause: annotation.probable_cause,
      label: annotation.label,
      process: annotation.process,
      created_at: annotation.created_at ?? "",
      updated_at: annotation.updated_at ?? "",
    }

    this.old_data = { ...this.data }
  }
}

AnnotationLabel.prototype.path = "/annotations/";

export default AnnotationLabel;
