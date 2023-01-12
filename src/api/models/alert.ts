import { CRUD } from "@/api/mixins/mixins";

export interface AlertProps {
  id?: number;
  updated_at?: string;
  created_at?: string;
  area?: string | number;
  enabled?: boolean;
  label?: string | number;
  limit?: number;
  time_interval?: number;
}

class Alert extends CRUD {
  data: AlertProps;
  old_data: AlertProps;

  constructor(alert: AlertProps) {
    super();
    this.data = {
      id: alert.id ?? -1,
      limit: alert.limit ?? 0,
      area: alert.area ?? 0,
      enabled: alert.enabled ?? false,
      time_interval: alert.time_interval,
      label: alert.label ?? 0,
      created_at: alert.created_at,
      updated_at: alert.updated_at,
    }

    this.old_data = { ...this.data };
  }
}

Alert.prototype.path = "/alerts/";
export default Alert;
