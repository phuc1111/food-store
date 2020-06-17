<template>
  <div>
    <router-link :to="{name: 'M001Food'}" class="back">Quay lại</router-link>
    <div class="addfood">
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Nhập
            <code>tên sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="name" placeholder="VD: Rau cải Đà Lạt"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Chọn
            <code>hình ảnh</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <cld-image
            cloudName="pnvcc"
            :publicId="this.$route.params.public_id"
            width="100"
            crop="scale"
          />
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Nhập
            <code>giá sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="old_price" placeholder="VD: 15000"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Giảm giá
            <code>Giá mới</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="number" v-model="price" placeholder="VD: 15000"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Nhập
            <code>mô tả sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <!-- <b-form-input type="text" v-model="description"></b-form-input> -->
          <b-form-textarea
            type="text"
            v-model="description"
            placeholder="VD: Đây là rau siêu sạch, .."
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Nhập
            <code>xuất xứ sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="from" placeholder="VD: Quảng Nam, Hà Nội, ..."></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Chọn
            <code>loại sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-select v-model="category" :options="options"></b-form-select>
        </b-col>
      </b-row>
    </div>
    <div class="alert alert-danger" v-if="error.length>0" role="alert">
      <div v-for="(err, index) in error" :key="index">{{err}}</div>
    </div>
    <button type="button" class="btn btn-info" @click="update()">Sửa sản phẩm</button>
  </div>
</template>
<script>
/* eslint-disable */
import db from "@/firebase/init";
// import axios from "axios";
// import Cloudinary from "cloudinary-vue";
import date from "../../../autoCreate/date";
export default {
  name: "M001UpdateFood",
  data() {
    return {
      results: null,
      old_price: null,
      name: "test - rau sach",
      file: null,
      price: null,
      date: null,
      description: "test - .........................",
      comment: [],
      from: "test-Quang nam",
      category: null,
      error: [],
      formData: null,
      options: [
        { value: null, text: "Vui lòng chọn loại sản phẩm" },
        { value: 1, text: "Rau sạch" },
        { value: 2, text: "Hải sản" }
      ],
      foods: [],
      id: null
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
    check() {
      if (!this.name) {
        this.error.push("Vui lòng nhập tên sản phẩm");
      }
      if (!this.price) {
        this.error.push("Vui lòng nhập giá sản phẩm");
      }
      if (this.price) {
        if (this.price < 5000) {
          this.error.push("Giá sản phẩm phải lớn hơn 5000 VND");
        }
        if (this.price > 5000000) {
          this.error.push("Giá sản phẩm không được lớn hơn 5 triệu VND");
        }
      }
      if (!this.description) {
        this.error.push("Vui lòng nhập mô tả sản phẩm");
      }
      if (!this.from) {
        this.error.push("Vui lòng nhập xuất xứ sản phẩm");
      }
      if (!this.category) {
        this.error.push("Vui lòng chọn loại sản phẩm");
      }
    },
    update() {
      if (this.price > this.new_price) {
      }
      db.collection("foods")
        .doc(this.id)
        .update({
          name: this.name,
          price: this.price,
          description: this.description,
          from: this.from,
          category: this.category,
          old_price: this.old_price
        })
        .then(() => {
          this.$router.push({ name: "M001Food" });
          this.toast("Sửa sản phẩm thành công");
        });
    }
  },
  created() {
    console.log(this.$route.params.public_id);
    db.collection("foods")
      .where("public_id", "==", this.$route.params.public_id)
      .get()
      .then(data => {
        // console.log(data.data());
        data.forEach(res => {
          console.log(res.data());
          (this.id = res.id), (this.name = res.data().name);
          this.price = res.data().price;
          this.old_price = res.data().price;
          this.description = res.data().description;
          this.from = res.data().from;
          this.category = res.data().category;
        });
      });
  }
};
</script>
<style scoped>
.addfood {
  width: 800px;
  margin: 70px auto;
  border: 1px solid rgb(77, 74, 74);
}
.back {
  position: absolute;
  top: 30px;
  left: 20%;
}
</style>