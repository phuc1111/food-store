<template>
  <div>
    <Navbar />
    <div class="login">
      <div id="recaptcha-container"></div>
      <div class="form-group forms">
        <label for>Tên đăng nhập</label>
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="username" />
        <!-- <label for>Mật khẩu</label>
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="password" />-->
        <button type="button" class="btn btn-info btn-login" @click="login()">Đăng nhập</button>
        <div class="alert-danger" v-if="error.length>0">
          <div class="alert-danger" v-for="(err, index) in error" :key="index">{{err}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import firebase from "firebase";
export default {
  name: "SeeFood",
  components: {
    Navbar
  },
  data() {
    return {
      username: "user",
      password: "user",
      error: [],
      recaptchaVerifier: null,
      token: null
    };
  },
  methods: {
    login() {
      var vm = this;
      firebase.auth().languageCode = "vi";
      var applicationVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
      firebase
        .auth()
        .signInWithPhoneNumber("+84846691716", applicationVerifier)
        .then(confirmationResult => {
          var code = prompt("Nhập mã được gửi đến điện thoại của bạn", "");

          confirmationResult
            .confirm(code)
            .then(function(result) {
              // User signed in successfully.
              console.log(result.user);
              // this.token = result.user.refreshToken;
              sessionStorage.setItem("token", result.user.refreshToken);
              sessionStorage.setItem("phone", result.user.phoneNumber);
              vm.$router.push({ name: "Home" });
              location.reload();
              // ...
            })
            .catch(function(error) {
              // User couldn't sign in (bad verification code?)
              console.log("loi : ", error);
              //   this.error = error;
              // ...
            });
        })
        .catch(function(error) {
          //   this.error.push(error.message);
          console.error("SMS not sent", error.message);
        });
    },
    created() {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container"
      );
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
</style>