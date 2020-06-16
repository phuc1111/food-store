<template>
  <div class="detail">
    <Navbar />
    <Slide />
    <p class="title">Chi tiết sản phẩm</p>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/" class="breadcrumb-name">Trang chủ</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">chi tiết</li>
      </ol>
    </nav>
    <div class="food-detail">
      <img :src="foods.image" alt class="image" />
      <div class="content">
        <h2 class="name">{{foods.name}}</h2>
        <p>{{foods.description}}</p>
        <div class="btn-action">
          <button type="button" class="btn btn-primary">Thêm vào giỏ</button>
          <p class="price">{{foods.price}} VND</p>
        </div>
      </div>
    </div>

    <div class="slide"></div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Footer from "../../components/Footer";

import db from "@/firebase/init";

export default {
  name: "FoodDetail",
  components: {
    Navbar,
    Slide,
    Footer
  },
  data() {
    return {
      foods: {},

      isLoading: false,
      fullPage: true,
      color: "#17a2b8"
    };
  },
  methods: {
    load() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    count() {}
  },
  created() {
    db.collection("foods")
      .doc(this.$route.params.id)
      .get()
      .then(data => {
        console.log(data.data());
        this.foods = data.data();
      });
    console.log(this.foods);
  }
};
</script>
<style>
.detail {
  max-width: 1500px;
  margin: 0 auto;
}
.food-detail {
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
}
.btn-action {
  display: flex;
  justify-content: space-around;
  align-self: center;
}
.content {
  margin: 10px 0;
  width: 50%;
}
.price {
  align-self: center;
}
.image {
  width: 100%;
}
@media only screen and (max-width: 46.24em) {
  .food-detail {
    margin: 10px auto;
    display: block;
  }
  .image {
    width: 100%;
  }
  .content {
    margin: 10px;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .food-detail {
    margin: 50px auto;
    display: block;
  }
}
</style>