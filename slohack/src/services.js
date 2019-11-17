import api from "./api";

export default {
    fetchUser() {
        return api().get("/users")
    },

    getParkingByLevel(params) {
        return api().get(`/parkings/${params.level}`)
    },

    getInfo(params) {
        return api().get(`/user/${params.plate}`)
    },

    getLevel() {
        return api().get(`/lvl`)
    },

    postUser(params) {
        return api().post('/user', params)
    }
};