<template>
  <div>
    <Navbar />
    <div class="login">
      <div class="form-group forms">
        <label for>Tên đăng nhập</label>
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="username" />
        <label for>Mật khẩu</label>
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="password" />
        <button type="button" class="btn btn-info btn-login" @click="login()">Đăng nhập</button>
      </div>
    </div>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</template>
<script>
import Navbar from "../../components/Navbar";

export default {
  name: "SeeFood",
  components: {
    Navbar
  },
  data() {
    return {
      username: "user",
      password: "user",
      error: null
    };
  },
  methods: {
    login() {
      if (this.username && this.password) {
        if (this.username == "user" && this.password == "user") {
          sessionStorage.setItem("user", this.username);

          this.$router.push({ name: "Home" });
          location.reload();
        } else {
          this.error = "Tên đăng nhập hoặc mật khẩu sai";
        }
      } else {
        this.error = "Vui lòng điền tên đăng nhập và mật khẩu";
      }
    }
  }
};
</script>
<style>
.login {
  width: 500px;
  margin: 50px auto;
  background: #17a2b8;
}
.forms {
  width: 90%;
  margin: 0 auto;
}
.btn-login {
  margin: 10px;
}
.error {
  color: rgb(197, 33, 33);
}
</style>