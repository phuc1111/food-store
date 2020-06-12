<template>
  <div>
    <Navbar />
    <div class="login">
      <div class="form-group forms">
        <label for>Email</label>
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="email" />
        <label for>Số điện thoại</label>
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="phone" />
        <label for>Địa Chỉ</label>
        <input type="text" class="form-control" placeholder="Tên đăng nhập" v-model="address" />
        <label for>Mật khẩu</label>
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="password" />
        <label for>Xác nhận mật khẩu</label>
        <input type="password" class="form-control" placeholder="Mật khẩu" v-model="re_password" />
        <button type="button" class="btn btn-info btn-login" @click="sigup()">Đăng ký</button>
      </div>
    </div>
    <div class="error alert-danger" v-if="error.length>0">
      <div v-for="(err , index) in error" :key="index">{{err}}</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Navbar from "../../components/Navbar";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "SeeFood",
  components: {
    Navbar
  },
  data() {
    return {
      username: "user",
      re_password: "123456",
      password: "123456",
      address: "101 B",
      email: "thienphuc.dev@gmail.com",
      phone: "0364097689",
      error: []
    };
  },
  methods: {
    sigup() {
      this.error = [];
      this.check();
      var ref = db.collection("foods").where("email", "==", this.email);
      if (this.error.length == 0) {
        ref.get().then(doc => {
          if (doc.exists) {
            this.error.push("Email đã tồn tại");
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(user => {
                db.collection("users")
                  .add({
                    email: this.email,
                    user_id: user.user.uid,
                    phone: this.phone,
                    address: this.address
                  })
                  .then(() => {
                    this.$router.push({ name: "Home" });
                  })
                  .catch(err => {
                    this.error = err;
                    console.log(err);
                  });
              })
              .catch(err => {
                this.error.push(err.message);
              });
          }
        });
      }
    },
    check() {
      if (!this.email) {
        this.error.push("Vui lòng điền tên đăng nhập");
      }
      if (!this.password) {
        this.error.push("Vui lòng điền mật khẩu");
      }
      if (!this.phone) {
        this.error.push("Vui lòng điền số điện thoại");
      }
      if (!this.address) {
        this.error.push("Vui lòng điền địa chỉ");
      }
      if (this.password != this.re_password) {
        this.error.push("Mật khẩu không khớp");
      }
    },
    mounted() {
      this.error = [];
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