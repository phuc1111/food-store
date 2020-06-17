<template>
  <div class="dashboard1">
    <M001Leftmenu class="leftt" />
    <div class="content">
      <h2>Tính năng đang được phát triển</h2>
      <div class="total">
        <M001Total
          class="total-detail total-order"
          :name="total[0].name"
          :value="total[0].value"
          :icon="total[0].icon"
        />
        <M001Total
          class="total-detail total-cus"
          :name="total[1].name"
          :value="total[1].value"
          :icon="total[1].icon"
        />
        <M001Total
          class="total-detail total-food"
          :name="total[2].name"
          :value="total[2].value"
          :icon="total[2].icon"
        />
        <M001Total
          class="total-detail total-price"
          :name="total[3].name"
          :value="total[3].value"
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

export default {
  name: "M001Dashboard",
  components: {
    M001Leftmenu,
    M001Total,
    M001Count
  },
  data() {
    return {
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
  background: #36bea6;
}
.total-cus {
  background: #009efb;
}
.total-food {
  background: #55c256;
}
.total-price {
  background: #f62d51;
}
@media only screen and (max-width: 46.24em) {
  .leftt {
    display: none;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
}
</style>