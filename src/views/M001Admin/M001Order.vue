<template>
  <div class="main-orders">
    <M001Leftmenu />
    <div class="content-order">
      <h2 class="order-title">Quản lý đơn hàng</h2>
      <div class="error" v-if="error.lengh > 0">
        <div class="alert-danger" v-for="(err, i) in error" :key="i">{{err}}</div>
      </div>
      <table class="table">
        <thead>
          <tr class="top-table">
            <th>STT</th>
            <th>Số điện thoại</th>
            <th>Chi tiết đơn hàng</th>
            <th>Ngày order</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item-detail" v-for="(order, i) in orders" :key="i">
            <td>{{i+1}}</td>
            <td>{{order.phone}}</td>
            <td>
              <div
                v-for="(food, index) in order.foods"
                :key="index"
              >{{food.name}} x {{food.number}}: {{food.number*food.price | priceToVnd}}</div>
            </td>
            <td>{{order.date}}</td>
            <td>{{order.total | priceToVnd}}</td>
            <td class="action">
              <b-icon-check
                class="check"
                v-if="order.isCheck == false"
                @click="updateOrder(order.id)"
              ></b-icon-check>
              <b-icon-backspace-fill class="cancel" @click="deleteOrder(order.id)"></b-icon-backspace-fill>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import db from "@/firebase/init";
export default {
  name: "M001Order",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      orders: [],
      error: []
    };
  },
  methods: {
    toast(content) {
      this.$bvToast.toast(content, {
        title: "Thông báo",
        toaster: "b-toaster-bottom-left",
        solid: true,
        appendToast: true
      });
    },
    getOrder() {
      this.orders = [];
      db.collection("orders")
        // .orderBy("phone")
        .orderBy("isCheck")
        .get()
        .then(data => {
          data.forEach(doc => {
            let order = doc.data();
            order.id = doc.id;
            this.orders.push(order);
            console.log(order);
          });
        });
    },

    deleteOrder(id) {
      console.log(id);
      db.collection("orders")
        .doc(id)
        .delete()
        .then(() => {
          this.orders = this.orders.filter(food => {
            return food.id != id;
          });
          this.toast("Xóa thành công");
        })
        .catch(err => {
          this.error = err;
        });
    },
    updateOrder(id) {
      db.collection("orders")
        .doc(id)
        .update({
          isCheck: true
        })
        .then(() => {
          this.toast("Xác nhận đơn hàng thành công");
          this.getOrder();
        });
    }
  },
  created() {
    this.getOrder();
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
<style >
.main-orders {
  display: flex !important;
}
.content-order {
  margin: 60px 20px;
  width: 100%;
}
.top-table {
  background: rgb(25, 147, 163);
}
.item-detail {
  transition: linear 1s;
}
.item-detail:hover {
  background: rgba(98, 157, 165, 0.733);
  border: 1.5px solid rgba(66, 153, 165, 0.733);
}
.action {
  justify-content: space-around;
  font-size: 25px;
  align-self: center;
}
.check {
  font-size: 30px;
  color: rgba(33, 184, 58, 0.897);
}
.cancel {
  color: rgba(179, 29, 29, 0.897);
}
</style>