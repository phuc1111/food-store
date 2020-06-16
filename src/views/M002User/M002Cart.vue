<template>
  <div class="cart-item">
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
  width: 400px;
}
.cart-image {
  height: 50px;
  width: auto;
}
</style>