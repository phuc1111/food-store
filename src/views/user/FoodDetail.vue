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
      <img :src="image" alt class="image" />
      <div class="content">
        <h2 class="name">{{name}}</h2>
        <p>{{description}}</p>
        <div class="btn-action">
          <button type="button" class="btn btn-primary">Thêm vào giỏ</button>
          <p class="price">{{price}} VND</p>
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

export default {
  name: "FoodDetail",
  components: {
    Navbar,
    Slide,
    Footer
  },
  data() {
    return {
      image:
        "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
      name: "Rau hoi sach ",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.",
      price: 15000,
      old_price: 20000,
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
    count() {
      return this.$store.getters.doneTodos;
    }
  },
  created() {
    console.log(this.count());
  }
};
</script>
<style>
.detail {
  max-width: 1500px;
  margin: 0 auto;
}
.food-detail {
  max-width: 1500px;
  margin: 50px auto;
  display: flex;
}
.btn-action {
  display: flex;
  justify-content: space-around;
  align-self: center;
}
.content {
  margin: 10px 50px;
}
.price {
  align-self: center;
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