<template>
  <div class="main-navbar">
    <b-navbar toggleable="lg" type="dark" variant="info" class="main-nav">
      <b-navbar-brand :to="{name: 'Home'}">FoodStore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="menu-top">
          <b-nav-item :to="{name: 'Vegetable'}">Rau Sạch</b-nav-item>
          <b-nav-item :to="{name: 'SeeFood'}">Hải Sản</b-nav-item>
          <b-nav-item :to="{name: 'About'}">Giới Thiệu</b-nav-item>
          <b-nav-item :to="{name: 'Contact'}">Liên Hệ</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="nav-search">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Nhập sản phẩm để tìm"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 btn-search" type="submit">Tìm kiếm</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Giỏ Hàng" right>
            <b-dropdown-item href="#" v-if="arrCart.length < 1">
              Giỏ hàng trống, Reload lại trang hoặc
              <br />thêm sản phẩm để thấy chi tiết giỏ hàng
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <M002Cart
                v-for="(cartItem, i) in this.arrCart"
                :key="i"
                :name="cart[cartItem].name"
                :image="cart[cartItem].image"
                :price="cart[cartItem].price"
                :number="cart[cartItem].number"
              />
            </b-dropdown-item>
            <b-dropdown-item v-if="arrCart.length>0">
              <div class="cart-bottom-action">
                <p>Tổng tiền: {{totalPrice | priceToVnd}}</p>
                <button type="button" class="btn btn-primary" @click="buy()">Mua</button>
              </div>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em v-if="!phone">User</em>
              <em v-if="phone">{{phone}}</em>
            </template>
            <b-dropdown-item href="#" v-if="!token" @click="login()">Đăng nhập</b-dropdown-item>
            <b-dropdown-item href="#" v-if="token">Trang cá nhân</b-dropdown-item>
            <b-dropdown-item href="#" @click="logout()" v-if="token">Đăng xuất</b-dropdown-item>
            <b-dropdown-item href="#" v-if="token">Yêu Thích</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div>
      <b-modal id="modal-center" class="show-noti" v-model="show" centered title="Thông báo">
        <p class="my-4">Đặt hàng thành công, nhân viên cửa hàng sẽ liên hệ trong giây lát!</p>
        <!-- <b-button @click="hideModal()">OK</b-button> -->
      </b-modal>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import db from "@/firebase/init";
import date from "../../autoCreate/date";
import M002Cart from "../components/M002component/M002Cart";
export default {
  name: "Navbar",
  components: {
    M002Cart
  },
  data() {
    return {
      token: null,
      phone: null,
      cart: {},
      arrCart: [],
      totalPrice: 0,
      realCart: [],
      show: false
    };
  },
  methods: {
    login() {
      if (!this.user) {
        this.$router.push({ name: "M003Login" });
      }
    },
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      location.reload();
      // this.$router.push({ name: "Home" });
    },
    getValue() {
      this.token = localStorage.getItem("token");
      this.phone = localStorage.getItem("phone");
      // this.cart = this.$store.state.cart;
      // console.log(this.realCart);
      this.arrCart = Object.keys(sessionStorage);

      // console.log(this.totalPrice);
      var newarr = this.arrCart.reduce((a, b, i) => {
        // this.$store.commit("pushCart", JSON.parse(sessionStorage.getItem(b)));

        this.cart[b] = JSON.parse(sessionStorage.getItem(b));
        return a;
      }, {});
    },
    getTotalPrice() {
      return this.arrCart.reduce((a, b) => {
        this.totalPrice += this.cart[b].price * this.cart[b].number;
        return a;
      }, {});
    },
    hideModal() {
      this.show = false;
    },
    buy() {
      if (this.token && this.phone) {
        var new_phone = "+84" + this.phone.slice(1);
        var order = {
          foods: Object.values(this.cart),
          date: date.getCurrentDay(),
          total: this.totalPrice,
          isCheck: false,
          phone: this.phone
        };
        console.log(order);

        db.collection("orders")
          .add(order)
          .then(() => {
            this.show = true;
            console.log(this.show);
            this.cart = {};
            this.totalPrice = 0;
            this.arrCart = [];
            sessionStorage.clear();
            // location.reload();
          });
      } else {
        this.$router.push({ name: "M003Login" });
      }
    }
  },
  created() {
    this.getValue();
    // this.getTotalPrice();
  },
  mounted() {
    this.getTotalPrice();
    this.getValue();
  },
  filters: {
    priceToVnd(price) {
      if (!price) return "Chưa có";
      return (
        price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "  VND"
      );
    }
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
.navbar-brand {
  color: rgb(20, 20, 20) !important;
}
.cart-bottom-action {
  display: flex;
  justify-content: space-around;

  align-self: center;
}
.modal-title {
  color: aliceblue;
}
.modal-header {
  background: #17a2b8;
}
.modal-footer > .btn-secondary {
  display: none;
}
.modal-footer > .btn-primary {
  background: #17a2b8;
}
.main-nav .router-link-exact-active {
  color: rgb(233, 223, 223) !important;
}
.menu-top .router-link-exact-active {
  color: rgb(233, 223, 223) !important;
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