<template>
  <div class="vegetable">
    <Navbar />
    <Slide />
    <div class="title">Các sản phẩm rau sạch</div>
    <div class="sort">
      <nav aria-label="breadcrumb" class="bread">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/" class="breadcrumb-name">Trang chủ</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">rau sạch</li>
        </ol>
      </nav>
      <button type="button" class="btn btn-info sort-btn">Sắp xếp</button>
      <div class="btn-group sort-price">
        <button
          type="button"
          class="btn btn-light dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Theo Giá</button>
        <div class="dropdown-menu">
          <div class="dropdown-item item" @click="cleanSort()">Tất cả</div>
          <div class="dropdown-item item" @click="sortDesc()">Từ thấp đến cao</div>
          <div class="dropdown-item item" @click="sortAsc()">Từ cao đến thấp</div>
          <div class="dropdown-item item" @click="setDiscount()">Đang giảm giá</div>
        </div>
      </div>
      <div class="btn-group sort-price">
        <button
          type="button"
          class="btn btn-light dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Theo Ngày</button>
        <div class="dropdown-menu">
          <a class="dropdown-item item" @click="sortDateDesc()">Mới nhất</a>
          <a class="dropdown-item item" @click="sortDateAsc()">Cũ nhất</a>
        </div>
      </div>
      <div class="input-group mb-3 search">
        <input
          type="text"
          class="form-control"
          placeholder="Nhập tên sản phẩm"
          aria-label="Nhập tên sản phẩm"
          aria-describedby="button-addon2"
          v-model="search"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button" id="button-addon2">Tìm kiếm</button>
        </div>
      </div>
    </div>
    <div class="err" v-if="searchData.length < 1">Không có sản phẩm nào tương thích</div>
    <div class="food">
      <Food
        v-for="(food, index) in searchData"
        :key="index"
        :image="food.image"
        :price="food.price"
        :description="food.description"
        :name="food.name"
        :old_price="food.old_price"
        :id="food.id"
      />
    </div>
    <Footer />
  </div>
</template>
<script>
import db from "@/firebase/init";
import Navbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Footer from "../../components/Footer";
import Food from "../../components/Food";
export default {
  name: "Vegetable",
  components: {
    Navbar,
    Slide,
    Footer,
    Food
  },
  data() {
    return {
      foods: [],
      search: null,
      error: null,
      discount: false
    };
  },
  methods: {
    cleanSort() {
      this.discount = false;
      this.search = null;
    },
    setDiscount() {
      this.discount = !this.discount;
    },
    sortDesc() {
      this.foods.sort(function(a, b) {
        return a.price - b.price;
      });
    },
    sortAsc() {
      this.foods.sort(function(a, b) {
        return b.price - a.price;
      });
    },
    sortDateDesc() {
      this.foods.sort(function(a, b) {
        return a.time - b.time;
      });
    },
    sortDateAsc() {
      this.foods.sort(function(a, b) {
        return b.time - a.time;
      });
    }
  },
  created() {
    db.collection("foods")
      .where("category", "==", 1)
      .get()
      .then(data => {
        data.forEach(doc => {
          let food = doc.data();
          food.id = doc.id;
          this.foods.push(food);
        });
      });
  },
  computed: {
    searchData() {
      if (this.search && this.discount) {
        return this.foods.filter(food => {
          return (
            food.name.toLowerCase().includes(this.search.toLowerCase()) &&
            food.old_price != null &&
            food.old_price > food.price
          );
        });
      }
      if (this.search && !this.discount) {
        return this.foods.filter(food => {
          return food.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (!this.search && this.discount) {
        return this.foods.filter(food => {
          return food.old_price > food.price && food.old_price != null;
        });
      } else {
        return this.foods;
      }
    }
  }
};
</script>
<style>
.title {
  font-size: 27px;
}
.vegetable {
  max-width: 1500px;
  margin: 0 auto;
}

.sort-btn {
  height: 40px;
  align-self: center;
  margin-left: 20%;
}
.food {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.sort {
  display: flex;
  justify-content: space-between;
  align-self: center !important;
}
.sort-price {
  align-self: center;
}
.input-group {
  width: 30% !important;
}
.search {
  align-self: center;
  float: right !important;
  margin-left: 20px;
}
.item {
  transition: linear 0.25s;
}
.item:hover {
  background: #17a2b8 !important;
  color: #fff !important;
}
.err {
  color: red;
  font-size: 25px;
  margin: 25px;
}
@media only screen and (max-width: 46.24em) {
  .sort-btn {
    margin-left: 0;
  }
  .bread {
    display: none;
  }
  .input-group {
    width: 50% !important;
  }
  .search {
    display: none !important;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .sort-btn {
    height: 40px;
    align-self: center;
    margin-left: 0;
  }
  .bread {
    display: none;
  }
  .input-group {
    width: 50% !important;
  }
}
</style>