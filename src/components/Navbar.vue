<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="main-nav">
      <b-navbar-brand href="#">FoodStore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Rau Sạch</b-nav-item>
          <b-nav-item href="#">Hải Sản</b-nav-item>
          <b-nav-item href="#">Giới Thiệu</b-nav-item>
          <b-nav-item href="#">Liên Hệ</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="nav-search">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 btn-search" type="submit">Search</b-button>
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
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Đăng nhập</b-dropdown-item>
            <b-dropdown-item href="#">Trang cá nhân</b-dropdown-item>
            <b-dropdown-item href="#">Đăng xuất</b-dropdown-item>
            <b-dropdown-item href="#">Yêu Thích</b-dropdown-item>
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
    return {};
  }
};
</script>
<style>
.navbar {
  padding: 0.5rem 10rem !important;
  max-width: 1500px;
  margin: 0 auto;
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