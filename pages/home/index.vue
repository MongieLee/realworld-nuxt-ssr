<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'home',query:{tab:'your_feed'}}"
                           exact :class="{active:tab==='your_feed'}">Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link :class="{active:tab==='global_feed'}" :to="{name:'home',query:{tab:'global_feed'}}"
                           exact class="nav-link">Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link exact :class="{active:tab==='tag'}" :to="{name:'home'}" class="nav-link">#{{
                    tag
                  }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{name:'profile',params:{username:article.author.username}}">
                <img class="user-pic"
                     :src="article.author.image?article.author.image:require('~/assets/default_avatar.png')"
                     alt="user-avatar">
              </nuxt-link>

              <div class="info">
                <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" href="" class="author">Eric
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | time }}</span>
              </div>
              <button @click="onFavorite(article)" class="btn btn-outline-primary btn-sm pull-xs-right"
                      :disabled="article.favoritedDisable" :class="{active:article.favorited}">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{name:'articles',params:{id:article.slug}}" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <!--使用计算属性计算出totalPage，遍历循环出页面，并且绑定动态样式active-->
              <li class="page-item" :class="{active:item === page}" v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link"
                           :to="{name:'home',query:{page:item,tag:$route.query.tag,tab:$route.query.tab}}">
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link :to="{name:'home',query: {tag:item,tab:'tag'}}" class="tag-pill tag-default"
                         v-for="item in tags" :key="item">{{
                  item
                }}
              </nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import ArticlesService from "@/service/articles";
import TagsService from "@/service/tags";
import {mapState} from "vuex";

export default {
  name: "homeindex",
  data() {

  },
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({query, store}) {
    const {user} = store.state;
    const page = Number.parseInt(query.page || 1)
    const limit = 20;
    const {tag, tab} = query
    const loadArticles = user && tab === 'your_feed' ? ArticlesService.getFeed : ArticlesService.getList;
    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      TagsService.getTags()
    ])

    const {articles, articlesCount} = articlesRes.data
    const {tags} = tagsRes.data
    articles.forEach(i => i.favoritedDisable = false)
    return {
      articles,
      // articlesCount,
      articlesCount: 50,
      limit,
      page,
      tags,
      tag,
      tab: tab || "global_feed"
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      console.log(Math.ceil(this.articlesCount / this.limit))
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.favoritedDisable = true
      if (article.favorited) {
        await ArticlesService.removeFavorite(article.slug)
        article.favoritesCount -= 1
        article.favorited = false
      } else {
        await ArticlesService.addFavorite(article.slug)
        article.favoritesCount += 1
        article.favorited = true
      }
      article.favoritedDisable = false
    }
  }
}
</script>

<style scoped>

</style>
