import {request} from "@/plugins/request"

class UsersService {
    static login(data) {
        return request({
            url: '/users/login',
            method: 'post',
            data
        })
    }

    static register(data) {
        return request({
            url: '/users',
            method: "post",
            data
        })
    }
}

export default UsersService
