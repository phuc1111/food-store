
<template>
  <div class="home-food">
    <M002Chat />
    <Navbar />
    <Slide />
    <h3 class="title tracking-in-contract">Các sản phẩm mới nhất</h3>
    <div class="search-bar">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#" class="breadcrumb-name">Trang chủ</a>
          </li>
          <li v-if="isCate" class="breadcrumb-item active" aria-current="page">{{isCate}}</li>
        </ol>
      </nav>
      <b-input-group>
        <b-form-input type="text" placeholder="Nhập tên để tìm sản phẩm" class="search-input"></b-form-input>
        <b-input-group-prepend>
          <b-button variant="outline-info">Tìm</b-button>
        </b-input-group-prepend>
      </b-input-group>
    </div>

    <div class="main-home">
      <div class="home_category cate">
        <p class="home_category--name">Danh mục sản phẩm</p>
        <ul class="list-group">
          <li
            class="list-group-item list-category"
            @click="setCategory('Tất cả sản phẩm')"
          >Tất cả sản phẩm</li>
          <li
            class="list-group-item list-category"
            v-for="(cate, index) in categorys"
            :key="index"
            @click="setCategory(cate.name)"
          >{{cate.name}}</li>
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
          v-for="(food, index) in foodss"
          :key="index"
          :image="food.image"
          :price="food.price"
          :description="food.description"
          :name="food.name"
          :old_price="food.old_price"
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
          <a class="page-link" href="#">4</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#">5</a>
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
import db from "@/firebase/init";

import Navbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Food from "../../components/Food";
import Footer from "../../components/Footer";
import M002Chat from "../M002User/M002Chat";
export default {
  name: "Home",
  data() {
    return {
      foodss: [],
      categorys: [],
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
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 12000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description: "Some quick example content.",
          price: 12000,
          old_price: 100000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000,
          old_price: 100000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000,
          old_price: 1000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
          name: "Rau sieu sach ",
          description:
            "Some quick example text to build on the card title and make up the bulk of the card's content.",
          price: 12000
        },
        {
          image:
            "https://sohanews.sohacdn.com/thumb_w/660/2015/1-phan-biet-rau-sach-ban-1445052072947-0-0-359-488-crop-1445052237590.jpg",
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
  created() {
    db.collection("categorys")
      .get()
      .then(data => {
        data.forEach(doc => {
          let cate = doc.data();
          cate.id = doc.id;
          this.categorys.push(cate);
        });
      });
    db.collection("foods")
      .get()
      .then(data => {
        data.forEach(doc => {
          let cate = doc.data();
          cate.id = doc.id;
          this.foodss.push(cate);
        });
      });
    console.log(this.foodss);
    var food = sessionStorage.getItem("food");
    console.log(food);
  },
  components: {
    Navbar,
    Slide,
    Food,
    Footer,
    M002Chat
  }
};
</script>
<style scoped>
.home-food {
  max-width: 1500px;
  margin: 0 auto;
}
.main-home {
  border: 0.3px solid rgb(192, 190, 190);
  display: flex !important;
}
.title {
  margin: 20px 0;
}
.home_category {
  width: 20%;
}
.home_category--name {
  background-color: #17a2b8 !important;
  color: #fff;
  margin: 0;
  font-size: 20px;
}
.home_category--filter {
  background-color: #17a2b8 !important;
  color: #fff;
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
.breadcrumb-name {
  color: #17a2b8;
}
.pagination {
  justify-content: center;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tracking-in-contract {
  -webkit-animation: tracking-in-contract 0.8s
    cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation: tracking-in-contract 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
@-webkit-keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
  }
}
@keyframes tracking-in-contract {
  0% {
    letter-spacing: 1em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    letter-spacing: normal;
    opacity: 1;
  }
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
    display: none;
    margin: 0;
  }
  .search-bar {
    justify-content: center;
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