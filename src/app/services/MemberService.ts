import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member, MemberInput } from "../../lib/types/member";

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
            console.log("getTopUsers result:", result);

            if (Array.isArray(members)) return members;
            if (Array.isArray(members?.data)) return members.data;
            if (Array.isArray(members?.members)) return members.members;
            return [];
        } catch(err) {
            console.log("Error, getTopUsers:", err);
            throw err;
        }
    }

    public async getRestaurant(): Promise<Member> {
        try {
            const url = this.path + "/member/restaurant";
            const result = await axios.get(url);
            console.log("getRestaurant result:", result);
            const members = result.data;

            const restaurant: Member = result.data;
            return restaurant;
        } catch(err) {
            console.log("Error, getRestaurant:", err);
            throw err;
        }
    }

    public async signup(input: MemberInput): Promise<Member> {
        try {
            const url = this.path + "/member/signup";
            const result = await axios.post(url, input, {withCredentials: true });
            console.log("signup:", result);
            
            const member: Member = result.data.member;
            console.log("signup member:", member);
            localStorage.setItem("authMember", JSON.stringify(member));

            return member;
        } catch(err) {
            console.log("Error, signup:", err);
            throw err;
        }
}
}

export default MemberService;
