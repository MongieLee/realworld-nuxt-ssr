<template>

  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{ isLogin ? 'Sign up' : 'Sign in' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="message in messages" :key="message">
                {{ field }} : {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" required v-model="user.username" type="text"
                     placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" required v-model="user.email" type="email"
                     placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" required v-model="user.password" type="password"
                     placeholder="Password" :minlength="isLogin ? -1 :8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign up' : 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/service/users";

const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  name: "login",
  middleware: "unAuthenticated",
  data() {
    return {
      user: {
        username: undefined,
        email: undefined,
        password: undefined
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const payload = {user: this.user}
        const {data: {user}} = this.isLogin ? await UsersService.login(payload) : await UsersService.register(payload)
        this.$store.commit("setUser", user)
        Cookie.set('user', JSON.stringify(user));
        this.$router.push("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    }
  }
}
</script>

<style scoped>

</style>
