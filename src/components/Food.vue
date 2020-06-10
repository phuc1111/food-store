<template>
  <div>
    <div class="card" @click="goDetail()">
      <img class="card-img-top" :src="this.image" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{this.name}}</h5>
        <p class="card-text">{{this.description}}</p>
        <div class="bottom">
          <b-icon-cart-plus class="cart"></b-icon-cart-plus>
          <del class="old_price price" v-if="this.old_price">{{this.old_price}} VND</del>
          <span class="price">{{this.price}} VND</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Food",
  props: ["image", "name", "description", "price", "old_price"],
  data() {
    return {};
  },
  methods: {
    goDetail() {
      this.$router.push({ name: "FoodDetail" });
    }
  }
};
</script>
<style>
.card {
  margin: 15px;
  width: 18rem;
  transition: linear 0.2s;
}
.card:hover {
  background: rgb(230, 226, 226);
  box-shadow: 10px 7px 15px #aaaaaa;
}
.card:hover ~ .price {
  font-size: 20px;
}
.bottom {
  display: flex;
  justify-content: space-around;
}
.price,
.cart {
  align-self: center;
}
.cart {
  font-size: 20px;
}
.old_price {
  color: rgb(197, 33, 33);
}
@media only screen and (max-width: 46.24em) {
  .card {
    margin: 5px auto;
    width: 90%;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .card {
    margin: 10px;
    width: 22rem;
  }
}
</style>