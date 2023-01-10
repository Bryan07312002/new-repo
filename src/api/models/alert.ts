import { CRUD } from "@/api/mixins/mixins";

export interface AlertProps {
  id?: number;
  username?: String;
}

class Alert extends CRUD {
  data: Object;

  constructor(alert: AlertProps) {
    super();
    this.data = {
      id: alert.id ?? -1,
      updated_at: alert.updated_at,
      limit: alert.limit ?? 0,
      area: alert.area ?? 0,
      enabled: alert.enabled,
      time_interval: alert.time_interval,
      created_at: alert.created_at,
      label: alert.label,
    }
  }
}

Alert.prototype.path = "/alerts/";

export default Alert;
