<template>
  <div class="article-meta">
    <nuxt-link :to="{name:'profile',params:{username:article.author.username}}">
      <img class="user-pic"
           :src="article.author.image?article.author.image:require('~/assets/default_avatar.png')"
           alt="user-avatar">
    </nuxt-link>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | time }}</span>
    </div>

    <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following}">
      <i class="ion-plus-round"></i>
      Follow Eric Simons
    </button>
    <button class="btn btn-sm btn-outline-primary" :class="{active:article.favorited}">
      <i class="ion-heart"></i>
      Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
