import {request} from "@/plugins/request"

class TagsService {
    static getTags() {
        return request({
            url: '/tags',
            method: 'get'
        })
    }
}

export default TagsService;
