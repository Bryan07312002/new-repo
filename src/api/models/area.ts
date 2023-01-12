import { RetrieveListMixin } from "@/api/mixins/mixins";
import type { AxiosResponse } from "axios";
import API from "../API";

export interface AreaProps {
  id: number;
}

const ListMxin = RetrieveListMixin(class { });

class Area extends ListMxin {
  data: Object;
  old_data: Object;

  constructor(area: AreaProps) {
    super();
    this.data = {
      id: area.id,
    }

    this.old_data = { ...this.data }
  }

  public static async perform_retrieve_list(
    path: string,
    param?: Object
  ): Promise<AxiosResponse> {
    const api = new API();
    return await api.get(path, param ?? {});
  }
}

Area.prototype.path = "/area/";
export default Area;
