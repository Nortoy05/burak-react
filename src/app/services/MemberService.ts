import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
    private  readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getTopUsers(): Promise<Member[]> {
        try {
            const url = this.path + "/member/top-users";
            const result = await axios.get(url);
            const members = result.data;

            if (Array.isArray(members)) return members;
            if (Array.isArray(members?.data)) return members.data;
            if (Array.isArray(members?.members)) return members.members;
            return [];
        } catch(err) {
            console.log("Error, getTopUsers:", err);
            throw err;
        }
    }

}

export default MemberService;
