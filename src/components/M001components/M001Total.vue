<template>
  <div class="totall">
    <div class="left">
      <p class="name">{{this.name}}</p>
      <p>{{this.value}}</p>
    </div>
    <div class="right">
      <div class="circle">
        <font-icon :icon="icon" class="cart" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "M001Total",
  props: ["name", "value", "icon"],
  data() {
    return {
      order: 25,
      customer: 21,
      ptices: 232211,
      color: "#red"
    };
  }
};
</script>
<style scoped>
.totall {
  display: flex;
  justify-content: space-between;
  width: 300px;
  /* background: rgb(189, 120, 120); */
  margin: 10px 0;
  align-self: center;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: 10px 7px 5px rgb(121, 117, 117);
  transition: linear 0.3s;
}
.totall:hover {
  color: #17a2b8;
  background: rgb(46, 45, 45);
}
.right {
  align-self: center;
}
.cart {
  font-size: 38px;
  align-items: center !important;
}
.circle {
  width: 50px;
  height: 50px;
  background: rgb(88, 85, 85);
  border-radius: 45px;
}
</style>

