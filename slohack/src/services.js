import api from "./api";

export default {
    fetchUser() {
        return api().get("/users")
    }
};