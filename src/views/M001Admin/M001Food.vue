<template>
  <div class="foodd">
    <M001Leftmenu />
    <div class="content-food">
      <div class="top">
        <button type="button" class="btn btn-info" @click="addFood()">Thêm sản phẩm</button>

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
            <th>STT</th>
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
          <tr v-for="(food, index) in getItem" :key="index" class="item-detail">
            <td>{{index+1}}</td>
            <td>
              <!-- <img :src="food.image" width="50" height="50" /> -->
              <cld-image
                cloudName="pnvcc"
                loading="lazy"
                :publicId="food.public_id"
                width="50"
                crop="scale"
              />
            </td>
            <td @click="updateFood(food.public_id)">{{food.name}}</td>
            <td @click="updateFood(food.public_id)">{{food.category | optionToName}}</td>
            <td @click="updateFood(food.public_id)">{{food.price | priceToVnd}}</td>
            <td @click="updateFood(food.public_id)">{{food.old_price | priceToVnd}}</td>
            <td @click="updateFood(food.public_id)">{{(food.date)}} {{toDateTime(food.time)}}</td>
            <td @click="updateFood(food.public_id)">{{food.from}}</td>
            <td>{{limitDescription(food.description)}}</td>
            <td>
              <div class="action">
                <font-icon icon="trash" class="delete" @click="deleteFood(food.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true" @click="removePage()">&laquo;</span>
              <span class="sr-only" @click="removePage()">Previous</span>
            </a>
          </li>

          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true" @click=" addPage()">&raquo;</span>
              <span class="sr-only" @click=" addPage()">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import db from "@/firebase/init";
import date from "../../../autoCreate/date";
// import cloudinary from "cloudinary-vue";
export default {
  name: "M001Food",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      foods: [],
      page: 1,
      number: []
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
    limitDescription(text) {
      return text.substring(0, 55) + "...";
    },
    addPage() {
      if (this.page > this.foods.length / 10) {
        this.page == this.foods.length / 10;
        return;
      }
      this.page = this.page + 1;
    },
    removePage() {
      if (this.page == 1) {
        this.page == 1;
        return;
      }
      this.page = this.page - 1;
    },
    toDateTime(secs) {
      return date.getTimes(secs);
    },
    getFood() {
      db.collection("foods")
        .get()
        .then(data => {
          data.forEach(food => {
            let foods = food.data();
            foods.id = food.id;
            this.foods.push(foods);
          });
        });
    },
    deleteLocal(id) {
      this.foods = this.foods.filter(food => {
        return food.id != id;
      });
    },
    addFood() {
      this.$router.push({ name: "M001AddFood" });
    },
    updateFood(public_id) {
      this.$router.push({
        name: "M001UpdateFood",
        params: { public_id: public_id }
      });
    },
    deleteFood(id) {
      db.collection("foods")
        .doc(id)
        .delete()
        .then(() => {
          this.toast("Xóa thành công");
          this.deleteLocal(id);
        });
    }
  },
  created() {
    this.getFood();
  },
  computed: {
    getItem() {
      return this.foods.filter((food, index) => {
        return index > this.page * 10 - 10 && index <= this.page * 10;
      });
    },
    getDataSearch() {
      if (this.search) {
        return this.foods.filter(cate => {
          return cate.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.foods;
      }
    }
  },
  filters: {
    priceToVnd: function(value) {
      if (!value) return "Chưa có";
      // a.value = a.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

      return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "  VND";
    },
    optionToName(number) {
      var result;
      if (number == 1) {
        result = "Rau Sạch";
      }
      if (number == 2) {
        result = "Hải Sản";
      }
      return result;
    }
  }
};
</script>
<style scoped>
.foodd {
  display: flex;
}
.content-food {
  max-width: 1600px;
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
.item-detail {
  transition: linear 1s;
}
.item-detail:hover {
  background: rgba(98, 157, 165, 0.733);
  border: 1.5px solid rgba(66, 153, 165, 0.733);
}
</style>