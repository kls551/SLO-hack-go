import api from "./api";

export default {
    fetchUser() {
        return api().get("/users")
    },

    getParkingByLevel(params) {
        return api().get(`/parkings/${params.level}`)
    },

    getLevel() {
        return api().get(`/lvl`)
    }
};