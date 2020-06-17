<template>
  <div class="cart-item self-cart">
    <img class="cart-image" :src="this.image" alt />
    <span class="cart-name">{{this.name}}</span>
    <span class="cart-price">{{this.price | priceToVnd}}</span>
    <span class="cart-number">{{this.number}}</span>
  </div>
</template>
<script>
export default {
  name: "M002Cart",
  props: ["image", "name", "price", "number"],
  data() {
    return {};
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
.cart-item {
  display: flex;
  justify-content: space-between;
  align-self: center;
  /* width: 400px; */
}
.cart-image {
  height: 50px;
  width: auto;
}
@media only screen and (max-width: 46.24em) {
  .self-cart {
    width: 80%;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .self-cart {
    justify-content: space-between;
    width: 100% !important;
  }
}
</style>