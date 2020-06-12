<template>
  <div class="main-navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" class="main-nav">
      <b-navbar-brand href="/">FoodStore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/rau-sach">Rau Sạch</b-nav-item>
          <b-nav-item href="/hai-san">Hải Sản</b-nav-item>
          <b-nav-item href="/gioi-thieu">Giới Thiệu</b-nav-item>
          <b-nav-item href="/lien-he">Liên Hệ</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="nav-search">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Nhập sản phẩm để tìm"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 btn-search" type="submit">Tìm kiếm</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Giỏ Hàng" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em v-if="!phone">User</em>
              <em v-if="phone">{{phone}}</em>
            </template>
            <b-dropdown-item href="#" v-if="!token" @click="login()">Đăng nhập</b-dropdown-item>
            <b-dropdown-item href="#" v-if="token">Trang cá nhân</b-dropdown-item>
            <b-dropdown-item href="#" v-if="token">Đăng xuất</b-dropdown-item>
            <b-dropdown-item href="#" v-if="token">Yêu Thích</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Navbar",
  data() {
    return {
      token: null,
      phone: null
    };
  },
  methods: {
    login() {
      if (!this.user) {
        this.$router.push({ name: "Login" });
      }
    },
    logout() {
      sessionStorage.clear();
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.phone = sessionStorage.getItem("phone");
  }
};
</script>
<style>
.navbar {
  padding: 0.5rem 10rem !important;
  max-width: 1500px;
  margin: 0 auto;
}
/* .main-navbar {
  position: fixed;
  z-index: 1000;
  
} */
.nav-link:hover {
  color: rgb(20, 20, 20) !important;
}
.navbar-brand:hover {
  color: rgb(20, 20, 20) !important;
}
@media only screen and (max-width: 46.24em) {
  .navbar {
    padding: 0.5rem 0.5rem !important;
  }
  .nav-search {
    justify-content: center;
  }
  .form-inline {
    display: block !important;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .navbar {
    padding: 0.5rem 1.5rem !important;
  }
  .nav-search {
    justify-content: center;
  }
}
</style>