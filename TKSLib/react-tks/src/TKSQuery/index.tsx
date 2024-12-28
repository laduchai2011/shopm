import { $id } from "../tricks";

class TKS_QUERY {
    constructor() {}

    byId(id: string): HTMLElement | null {
        return $id(id);
    }
}

const TKSQuery = new TKS_QUERY();

export default TKSQuery;