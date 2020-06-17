<template>
  <div>
    <router-link :to="{name: 'M001Food'}" class="back">Quay lại</router-link>
    <div class="addfood">
      <b-row class="my-1">
        <b-col sm="4">
          <label>
            Nhập
            <code>tên thể loại</code>:
          </label>
        </b-col>
        <b-col sm="8">
          <b-form-input type="text" v-model="name" placeholder="VD: Rau sạch, hải sản, ..."></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="4">
          <label>
            Nhập
            <code>mô tả loại sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="8">
          <b-form-textarea
            type="text"
            v-model="description"
            placeholder="VD: Đây là rau siêu sạch, .."
          ></b-form-textarea>
        </b-col>
      </b-row>
    </div>
    <div class="alert alert-danger" v-if="error.length>0" role="alert">
      <div v-for="(err, index) in error" :key="index">{{err}}</div>
    </div>
    <button type="button" class="btn btn-info" @click="upload()">Thêm loại sản phẩm mới</button>
  </div>
</template>
<script>
/* eslint-disable */
import db from "@/firebase/init";

export default {
  name: "M001AddCategory",
  data() {
    return {
      name: "test - rau sach",
      description: "test - .........................",
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
    check() {
      if (!this.name) {
        this.error.push("Vui lòng nhập tên sản phẩm");
      }
      if (!this.description) {
        this.error.push("Vui lòng nhập mô tả sản phẩm");
      }
    },
    upload() {
      db.collection("categorys")
        .add({
          name: this.name,
          description: this.description
        })
        .then(() => {
          this.toast("Thêm thành công");
          this.$router.push({ name: "M001Category" });
        })
        .catch(err => {
          this.error = err;
          console.log(err);
        });
    }
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