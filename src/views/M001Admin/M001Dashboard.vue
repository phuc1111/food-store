<template>
  <div class="dashboard1">
    <M001Leftmenu class="leftt" />
    <div class="content">
      <h2>Tính năng đang được phát triển</h2>
      <div class="total">
        <M001Total
          class="total-detail total-order"
          :name="total[0].name"
          :value="order"
          :icon="total[0].icon"
        />
        <M001Total
          class="total-detail total-cus"
          :name="total[1].name"
          :value="customer"
          :icon="total[1].icon"
        />
        <M001Total
          class="total-detail total-food"
          :name="total[2].name"
          :value="food"
          :icon="total[2].icon"
        />
        <M001Total
          class="total-detail total-price"
          :name="total[3].name"
          :value="money | priceToVnd"
          :icon="total[3].icon"
        />
      </div>
      <div class="count1">
        <M001Count :items="items" :name="time[0]" />
        <M001Count :items="items" :name="time[1]" />
        <M001Count :items="items" :name="time[2]" />
        <M001Count :items="items" :name="time[3]" />
      </div>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import M001Total from "../../components/M001components/M001Total";
import M001Count from "../../components/M001components/M001Count";
import db from "@/firebase/init";
// import date from "../../../autoCreate/date";
export default {
  name: "M001Dashboard",
  components: {
    M001Leftmenu,
    M001Total,
    M001Count
  },
  data() {
    return {
      order: null,
      customer: null,
      food: null,
      money: null,
      total: [
        {
          name: "Tổng đơn hàng",
          value: 22,
          icon: "cart-plus"
        },
        {
          name: "Số lượng khách hàng",
          value: 9,
          icon: "user"
        },
        {
          name: "Tổng sản phẩm",
          value: 25,
          icon: "utensils"
        },
        {
          name: "Tổng tiền",
          value: 250000,
          icon: "hand-holding-usd"
        }
      ],
      items: [
        {
          total_orders: 5,
          total_sales: 2,
          delivered_order: 2,
          rejected_order: 1,
          total_comments: 6
        }
      ],
      time: ["Trong ngày", "Trong tuần", "Trong tháng", "Trong năm"]
    };
  },
  mounted() {
    db.collection("orders")
      .get()
      .then(data => {
        this.order = data.size;
        data.forEach(order => {
          this.money += order.data().total;
        });
      });

    db.collection("users")
      .get()
      .then(data => {
        this.customer = data.size;
      });

    db.collection("foods")
      .get()
      .then(data => {
        this.food = data.size;
      });
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
.dashboard1 {
  display: flex;
}
.content {
  margin: 50px 30px;
  width: 95%;
}
.total {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.count1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 32px auto;
}
.total-order {
  /* background: #36bea6; */
  background-image: linear-gradient(to bottom right, #14ddb1f1, #ff8635);
}
.total-cus {
  /* background: #009efb; */
  background-image: linear-gradient(to right, #fc00ff, #00dbde);
}
.total-food {
  /* background: #55c256; */
  background-image: linear-gradient(to top right, #283048, #859398);
}
.total-price {
  /* background: #f62d51; */
  background-image: linear-gradient(to bottom right, #642b73, #c6426e);
}
@media only screen and (max-width: 46.24em) {
  .leftt {
    display: none;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
}
</style>