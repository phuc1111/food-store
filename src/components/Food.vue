<template>
  <div>
    <div class="card scale-in-hor-center shadow-inset-lr">
      <img class="card-img-top" @click="goDetail(id)" :src="this.image" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title" @click="goDetail(id)">{{this.name}}</h5>
        <p class="card-text">{{this.description}}</p>
        <div class="bottom">
          <b-icon-cart-plus class="cart" @click="addItemToStore()"></b-icon-cart-plus>
          <div>
            <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100"></b-form-spinbutton>
          </div>
          <del
            class="old_price price"
            v-if="this.old_price && this.old_price<this.price"
          >{{this.old_price}} VND</del>
          <span class="price">{{setPrice | priceToVnd}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Food",
  props: ["image", "name", "description", "price", "old_price", "id"],
  data() {
    return {
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
    goDetail(id) {
      this.$router.push({ name: "FoodDetail", params: { id: id } });
    },
    addItemToStore() {
      //check item in session
      var checkFood = sessionStorage.getItem(this.name);
      if (checkFood) {
        var checkFoodObj = JSON.parse(checkFood);
        var new_number = checkFoodObj.number + this.value;
        sessionStorage.removeItem(this.value);
        let food = {
          name: this.name,
          image: this.image,
          description: this.description,
          price: this.price,
          number: new_number
        };
        let item = JSON.stringify(food);
        sessionStorage.setItem(this.name, item);
        this.$store.commit("pushCart", food);
        this.toast();
      }
      if (!checkFood) {
        let food = {
          name: this.name,
          image: this.image,
          description: this.description,
          price: this.price,
          number: this.value
        };
        let item = JSON.stringify(food);
        sessionStorage.setItem(this.name, item);
        this.toast();
      }
      this.value = 1;
    }
  },
  computed: {
    setPrice() {
      return this.price * this.value;
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
.card {
  margin: 15px;
  width: 18rem;
  transition: linear 0.2s;
  background: rgb(212, 206, 206) !important;
  box-shadow: 10px 7px 15px #aaaaaa;
  min-height: 400px;
}
.card:hover {
  box-shadow: 10px 7px 15px #aaaaaa;
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
.cart:hover {
  color: #17a2b8;
  font-size: 25px;
}
.old_price {
  color: rgb(197, 33, 33);
}
.toast-header {
  color: #fff !important;
  background: #17a2b8 !important;
}
.scale-in-hor-center:hover {
  animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* .roll-in-blurred-top {
  animation: roll-in-blurred-top 1s cubic-bezier(0.23, 1, 0.32, 1) both;
} */
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

@media only screen and (max-width: 46.24em) {
  .card {
    margin: 10px auto;
    width: 95%;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .card {
    margin: 10px;
    width: 22rem;
  }
}
</style>