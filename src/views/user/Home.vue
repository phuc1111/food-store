
<template>
  <div class="home">
    <Navbar />
    <Slide />
    <h3 class="title">Các sản phẩm mới nhất</h3>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li v-if="isCate" class="breadcrumb-item active" aria-current="page">{{isCate}}</li>
      </ol>
    </nav>

    <div class="main">
      <div class="home_category cate">
        <p class="home_category--name">Danh mục sản phẩm</p>
        <ul class="list-group">
          <li
            class="list-group-item list-category"
            v-for="(cate, index) in category"
            :key="index"
            @click="setCategory(cate)"
          >{{cate}}</li>
        </ul>

        <p class="home_category--filter cate">Lọc theo</p>
        <ul class="list-group">
          <li
            class="list-group-item list-category"
            v-for="(price, index) in prices"
            :key="index"
          >{{price}}</li>
        </ul>
      </div>
      <div class="home__food">
        <Food
          v-for="(food, index) in foods"
          :key="index"
          :image="food.image"
          :price="food.price"
          :description="food.description"
          :name="food.name"
        />
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    <Footer />
  </div>
</template>
<script>
/* eslint-disable */
import Navbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Food from "../../components/Food";
import Footer from "../../components/Footer";
export default {
  name: "Home",
  data() {
    return {
      category: [
        "Tất cả sản phẩm",
        "Rau Sạch",
        "Hải sản tươi sống",
        "Trái cây"
      ],
      prices: [
        "<= 50.000 VND",
        "50.000 - 100.000 VND",
        "100.000 - 200.000 VND",
        "200.000 - 500.000 VND",
        ">= 500.000 VND"
      ],
      foods: [
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://lh3.googleusercontent.com/proxy/VDDfHH0dg0NhT2EMkuR7DDAwKKB9e54WiOrJmLQAygmkKZJPqSdEKRhMp67LXptQr-25FxoaKEyd5ASziMlU2OIX0pRqA19AHyIqzShqafxfgDquY2d-zrPFCBX39j9EOn4",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        }
      ],
      isCate: null
    };
  },
  methods: {
    setCategory(cate) {
      this.isCate = cate;
    }
  },
  components: {
    Navbar,
    Slide,
    Food,
    Footer
  }
};
</script>
<style>
.home {
  max-width: 1500px;
  margin: 0 auto;
}
.main {
  border: 0.3px solid rgb(192, 190, 190);
  display: flex;
}
.title {
  margin: 20px 0;
}
.home_category {
  width: 20%;
}
.home_category--name {
  /* background-color: #17a2b8 !important; */
  color: #17a2b8;
  margin: 0;
  font-size: 20px;
}
.home_category--filter {
  color: #17a2b8;
  margin: 30px 0 0 0;
  font-size: 20px;
}
.home__food {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-around;
}
.list-category:hover {
  background: #17a2b8;
  color: #fff;
}
.breadcrumb {
  margin: 40px 0 0 0 !important;
  margin: 0;
  background: rgb(255, 255, 255) !important;
}
.pagination {
  justify-content: center;
}
@media only screen and (max-width: 46.24em) {
  .title {
    margin: 10px 0;
  }
  .cate {
    display: none;
  }
  .home__food {
    width: 100%;
  }
  .breadcrumb {
    margin: 10px 0 0 0 !important;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .cate {
    display: none;
  }
  .home_category {
    width: 100%;
  }
  .home__food {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
  }
}
</style>