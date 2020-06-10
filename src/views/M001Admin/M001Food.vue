<template>
  <div class="foodd">
    <M001Leftmenu />
    <div class="content-food">
      <div class="top">
        <button type="button" class="btn btn-info">Thêm sản phẩm</button>

        <b-input-group>
          <b-form-input type="text" placeholder="Nhập tên để tìm sản phẩm" class="search-input"></b-form-input>
          <b-input-group-prepend>
            <b-button variant="outline-info">Tìm</b-button>
          </b-input-group-prepend>
        </b-input-group>
      </div>

      <table class="table">
        <thead class="top-table">
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Giá cũ</th>
            <th>Ngày</th>
            <th>Xuất xứ</th>
            <th>Mô tả</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(food, index) in foods" :key="index">
            <td>
              <img :src="food.image" width="50" height="50" />
            </td>
            <td>{{food.name}}</td>
            <td>{{food.category}}</td>
            <td>{{food.price}} VND</td>
            <td>{{food.old_price}} VND</td>
            <td>{{toDateTime(food.date)}}</td>
            <td>{{food.from}}</td>
            <td>{{limitDescription(food.description)}}</td>
            <td>
              <div class="action">
                <font-icon icon="pen" class="update" />
                <font-icon icon="trash" class="delete" />
              </div>
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
  name: "M001Food",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      foods: []
    };
  },
  methods: {
    limitDescription(text) {
      return text.substring(0, 35) + "...";
    },
    toDateTime(secs) {
      var t = new Date(1970, 0, 1); // Epoch
      t.setSeconds(secs);
      return t;
    }
  },
  created() {
    db.collection("foods")
      .get()
      .then(data => {
        data.forEach(food => {
          this.foods.push(food.data());
        });
      });
  },
  computed: {}
};
</script>
<style>
.foodd {
  display: flex;
}
.content-food {
  max-width: 1400px;
  margin: 60px 20px;
}
.top {
  display: flex;
  justify-content: space-around;
}
.search-input {
  width: 400px;
}
.action {
  align-self: center;
  display: flex;
  justify-content: space-around;
}
.update {
  color: rgba(7, 124, 124, 0.548);
  font-size: 25px;
}
.update:hover {
  color: rgba(7, 124, 124, 0.842);
}
.delete {
  color: rgba(233, 34, 34, 0.657);
  font-size: 25px;
}
.delete:hover {
  color: rgba(233, 34, 34, 0.986);
}
.top-table {
  background: rgb(25, 147, 163);
}
</style>