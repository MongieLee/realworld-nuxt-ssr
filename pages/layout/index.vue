<template>
  <div>

    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link to="/" exact class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/editor" class="nav-link" href="">
              <i class="ion-compose"></i>&nbsp;New Article
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/settings" class="nav-link" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link" href="">Sign in</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link" href="">Sign up</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/profile/1" class="nav-link">
              <img class="user-pic" src="https://api.realworld.io/images/smiley-cyrus.jpeg" alt="user-avatar">
              mongielee
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt-child/>
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "index.html"
}
</script>

<style scoped>

</style>
