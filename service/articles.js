import {request} from "@/plugins/request"

class ArticlesService {
    static getList(params) {
        return request({
            url: '/articles',
            method: 'get',
            params
        })
    }

    static getFeed(params) {
        return request({
            url: '/articles/feed',
            method: 'get',
            params
        })
    }

    static addFavorite(articleId) {
        return request({
            url: `/articles/${articleId}/favorite`,
            method: 'post',
        })
    }

    static removeFavorite(articleId) {
        return request({
            url: `/articles/${articleId}/favorite`,
            method: 'delete',
        })
    }

    static getArticle(articleId) {
        return request({
            url: `/articles/${articleId}`,
            method: 'get',
        })
    }
}

export default ArticlesService
