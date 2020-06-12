<template>
  <div>
    <div class="card scale-in-hor-center shadow-inset-lr">
      <img class="card-img-top" @click="goDetail()" :src="this.image" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title" @click="goDetail()">{{this.name}}</h5>
        <p class="card-text">{{this.description}}</p>
        <div class="bottom">
          <b-icon-cart-plus class="cart" @click="addItemToStore()"></b-icon-cart-plus>
          <del
            class="old_price price"
            v-if="this.old_price && this.old_price<this.price"
          >{{this.old_price}} VND</del>
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
    },
    addItemToStore() {
      var food = {
        name: this.name,
        image: this.image,
        description: this.description,
        price: this.price
      };
      sessionStorage.setItem("food", food);
      console.log(food);
    }
  }
};
</script>
<style>
.card {
  margin: 15px;
  width: 18rem;
  transition: linear 0.2s;
  background: rgb(212, 206, 206) !important;
  box-shadow: 10px 7px 15px #aaaaaa;
}
.card:hover {
  /* background: rgb(230, 226, 226); */
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
.scale-in-hor-center {
  animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.scale-in-hor-center:hover {
  /* animation: rotate-diagonal-1 0.75s linear both; */
  animation: roll-in-blurred-top 2s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.roll-in-blurred-top {
  animation: roll-in-blurred-top 1s cubic-bezier(0.23, 1, 0.32, 1) both;
}
.shadow-inset-lr {
  animation: shadow-inset-lr 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes shadow-inset-lr {
  0% {
    box-shadow: inset 0 0 0 0 transparent, inset 0 0 0 0 transparent;
  }
  100% {
    box-shadow: inset -6px 0 14px -6px rgba(0, 0, 0, 0.5),
      inset 6px 0 14px -6px rgba(0, 0, 0, 0.5);
  }
}
@keyframes roll-in-blurred-top {
  0% {
    transform: rotate(-360deg);
    filter: blur(10px);
    opacity: 0.3;
  }
  100% {
    transform: rotate(0deg);
    filter: blur(0);
    opacity: 1;
  }
}
@keyframes rotate-diagonal-1 {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  50% {
    transform: rotate3d(1, 1, 0, -180deg);
  }
  100% {
    transform: rotate3d(1, 1, 0, -360deg);
  }
}
@keyframes scale-in-hor-center {
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
@media only screen and (max-width: 46.24em) {
  .card {
    margin: 5px auto;
    width: 100%;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .card {
    margin: 10px;
    width: 22rem;
  }
}
</style>