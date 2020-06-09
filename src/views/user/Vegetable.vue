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
          <div class="dropdown-item item" @click="sortDesc()">Từ thấp đến cao</div>
          <div class="dropdown-item item" @click="sortAsc()">Từ cao đến thấp</div>
          <div class="dropdown-item item">Đang giảm giá</div>
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
          <a class="dropdown-item item" href="#">Mới nhất</a>
          <a class="dropdown-item item" href="#">Cũ nhất</a>
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
      />
    </div>
    <Footer />
  </div>
</template>
<script>
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
      foods: [
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau hoi sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 15000,
          old_price: 20000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 17000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 19000,
          old_price: 25000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 30000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 70000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 120000,
          old_price: 150000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 75000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 15000
        }
      ],
      search: null,
      error: null
    };
  },
  methods: {
    sortDesc() {
      this.foods.sort(function(a, b) {
        return a.price - b.price;
      });
    },
    sortAsc() {
      this.foods.sort(function(a, b) {
        return b.price - a.price;
      });
    }
  },
  computed: {
    searchData() {
      //   var aa = [1, 2, 3, 7, 9, 0, 2, 4];
      //   var a1 = aa.reduce(function(a, b) {
      //     return a < b;
      //   });
      //   console.log(a1);
      if (this.search) {
        return this.foods.filter(food => {
          return food.name.toLowerCase().includes(this.search.toLowerCase());
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