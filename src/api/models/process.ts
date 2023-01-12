import { CRUD } from "@/api/mixins/mixins";

export interface ProcessProps {
  id?: number;
  created_at?: String;
  updated_at?: String;
  name?: String;
  mac_address?: String;
  is_async?: Boolean;
}

class Process extends CRUD {
  data: Object;
  old_data: Object;

  constructor(annotation: ProcessProps) {
    super();
    this.data = {
      id: annotation.id ?? -1,
      name: annotation.name,
      mac_address: annotation.mac_address,
      is_async: annotation.is_async,
      created_at: annotation.created_at,
      updated_at: annotation.updated_at,
    }

    this.old_data = { ...this.data }
  }
}

Process.prototype.path = "/processes/";
export default Process;
