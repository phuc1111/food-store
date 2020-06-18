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
      <div class="detail-content">
        <h2 class="name">{{foods.name}}</h2>
        <p class="detail-description">{{foods.description}}</p>
        <div class="btn-action">
          <button type="button" class="btn btn-primary" @click="addItemToStore()">Thêm vào giỏ</button>
          <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100"></b-form-spinbutton>
          <p class="price">{{setPrice | priceToVnd}}</p>
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
      color: "#17a2b8",
      value: 1
    };
  },
  methods: {
    toast() {
      this.$bvToast.toast("Thêm thành công", {
        title: "Thông báo",
        toaster: "b-toaster-bottom-left",
        solid: true,
        appendToast: true
      });
    },
    load() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    addItemToStore() {
      //check item in session
      var checkFood = sessionStorage.getItem(this.foods.name);
      if (checkFood) {
        var checkFoodObj = JSON.parse(checkFood);
        var new_number = checkFoodObj.number + this.value;
        sessionStorage.removeItem(this.value);
        let food = {
          name: this.foods.name,
          image: this.foods.image,
          description: this.foods.description,
          price: this.foods.price,
          number: new_number
        };
        let item = JSON.stringify(food);
        sessionStorage.setItem(this.foods.name, item);
        this.$store.commit("pushCart", food);
        this.toast();
      }
      if (!checkFood) {
        let food = {
          name: this.foods.name,
          image: this.foods.image,
          description: this.foods.description,
          price: this.foods.price,
          number: this.value
        };
        let item = JSON.stringify(food);
        sessionStorage.setItem(this.foods.name, item);
        this.toast();
      }
      this.value = 1;
    }
  },
  created() {
    db.collection("foods")
      .doc(this.$route.params.id)
      .get()
      .then(data => {
        this.foods = data.data();
      });
  },
  computed: {
    setPrice() {
      return this.foods.price * this.value;
    }
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
.detail {
  max-width: 1500px;
  margin: 0 auto;
}
#demo-sb {
  width: 100px !important;
}
.btn-action .form-control {
  width: 25% !important;
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
.detail-content {
  margin: 10px auto;
  width: 50%;
}
.price {
  align-self: center;
}
.image {
  width: 50%;
  height: auto;
  max-height: 50vh;
}
@media only screen and (max-width: 46.24em) {
  .food-detail {
    margin: 10px auto;
    display: block;
  }
  .image {
    width: 90%;
  }
  .detail-content {
    margin: 5px 0;
    width: 100%;
  }
  .detail-description {
    margin: 10px auto !important;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .food-detail {
    margin: 50px auto;
    display: block;
  }
  .image {
    width: 80%;
  }
  .detail-content {
    margin: 5px;
    width: 100%;
  }
}
</style>