<template>
  <div>
    <div class="login">
      <div id="recaptcha-container"></div>
      <div class="form-group forms">
        <label for>Số điện thoại *</label>
        <input type="number" class="form-control" placeholder="vd: 0364097989" v-model="phone" />
        <label for>Địa chỉ</label>
        <input type="text" class="form-control" placeholder="vd: 20 Quang Trung" v-model="address" />
        <!-- <label for>Mật khẩu</label>
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="password" />-->
        <button type="button" class="btn btn-info btn-login" @click="login()">Đăng nhập / Đăng ký</button>
        <div class="alert-danger" v-if="error.length>0">
          <div class="alert-danger" v-for="(err, index) in error" :key="index">{{err}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import date from "../../../autoCreate/date";
import firebase from "firebase";
export default {
  name: "SeeFood",

  data() {
    return {
      username: "user",
      password: "user",
      error: [],
      phone: null,
      recaptchaVerifier: null,
      token: null,
      address: null
    };
  },
  methods: {
    checkPhone(phone) {
      var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (phone.match(reg)) {
        return true;
      } else {
        return false;
      }
    },
    check() {
      if (!this.phone) {
        this.error.push("Vui lòng nhập số điện thoại");
      }
      // if (this.phone.length < 10) {
      //   this.error.push("Sai định dạng số điện thoại");
      // }
      if (!this.checkPhone(this.phone)) {
        this.error.push("Sai định dạng số điện thoại");
      }
    },
    login() {
      this.error = [];
      this.check();
      if (this.error.length <= 0) {
        var vm = this;
        //set language and captcha
        firebase.auth().languageCode = "vi";
        var applicationVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container"
        );
        //format phone number
        var new_phone = "+84" + this.phone.slice(1);

        firebase
          .auth()
          .signInWithPhoneNumber(new_phone, applicationVerifier)
          .then(confirmationResult => {
            var code = prompt("Nhập mã được gửi đến điện thoại của bạn", "");

            confirmationResult
              .confirm(code)
              .then(function(result) {
                // User signed in successfully.
                console.log(result.user);
                // this.token = result.user.refreshToken;

                localStorage.setItem("token", result.user.refreshToken);
                localStorage.setItem("phone", result.user.phoneNumber);
                console.log(new_phone);
                db.collection("users")
                  // .where("phone", "==", new_phone)

                  .doc(new_phone)
                  .get()
                  .then(user => {
                    // console.log("first: ", user.data());
                    // user.forEach(doc => {
                    //   console.log("data is: ", doc.data());
                    // });
                    // console.log(user.data());
                    if (user.exists) {
                      console.log("check exist");
                      vm.$router.push({ name: "Home" });
                      location.reload();
                    } else {
                      console.log("new user ");
                      db.collection("users")
                        .doc(new_phone)
                        .set({
                          phone: new_phone,
                          address: this.address,
                          date: date.getCurrentDay()
                        })
                        .then(() => {
                          vm.$router.push({ name: "Home" });
                          location.reload();
                        });
                    }
                  })
                  .catch(err => {
                    this.error.push(err.message);
                  });
              })
              .catch(err => {
                // User couldn't sign in (bad verification code?)

                this.error.push(err.message);
                // ...
              });
          })
          .catch(function(error) {
            //   this.error.push(error.message);
            console.error("SMS not sent", error.message);
          });
      } else {
        this.toast();
      }
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
  margin: 100px auto;
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