<template>
  <div>
    <router-link :to="{name: 'M001Dashboard'}" class="back">Quay lại</router-link>
    <div class="addfood">
      <b-row class="my-1">
        <b-col sm="3">
          <label>
            Nhập
            <code>tên sản phẩm</code>:
          </label>
        </b-col>
        <b-col sm="9">
          <b-form-input type="text" v-model="name"></b-form-input>
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
          <b-form-input type="text" v-model="price"></b-form-input>
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
          <b-form-input type="text" v-model="description"></b-form-input>
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
          <b-form-input type="text" v-model="from"></b-form-input>
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
    <button type="button" class="btn btn-primary">Thêm sản phẩm</button>
  </div>
</template>
<script>
export default {
  name: "M001AddFood",
  data() {
    return {
      name: null,
      image: null,
      price: null,
      date: null,
      description: null,
      comment: [],
      from: null,
      category: null,
      options: [
        { value: null, text: "Vui lòng chọn loại sản phẩm" },
        { value: 1, text: "Rau sạch" },
        { value: 2, text: "Hải sản" }
      ]
    };
  }
};
</script>
<style>
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