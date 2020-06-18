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
          <b-form-file
            id="file-input"
            accept="image/png, image/jpeg"
            @change="handleFileChange($event)"
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <!-- <cld-image cloudName="pnvcc" publicId="zy20ogohunerrck8bcp1" width="100" crop="scale" /> -->
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
    <button type="button" class="btn btn-info" @click="upload()">Thêm sản phẩm</button>
  </div>
</template>
<script>
/* eslint-disable */
import db from "@/firebase/init";
import axios from "axios";
import Cloudinary from "cloudinary-vue";
import date from "../../../autoCreate/date";
export default {
  name: "M001AddFood",
  data() {
    return {
      results: null,
      name: "rau sach",
      file: null,
      price: null,
      date: null,
      description: "Đây là lạo rau sạch chỉ có ở tiệm chúng tôi",
      comment: [],
      from: "Quang nam",
      category: 1,
      error: [],
      formData: null,
      options: [
        { value: null, text: "Vui lòng chọn loại sản phẩm" },
        { value: 1, text: "Rau sạch" },
        { value: 2, text: "Hải sản" }
      ]
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
    handleFileChange(event) {
      console.log("handlefilechange", event.target.files);
      //returns an array of files even though multiple not used
      this.file = event.target.files[0];
      this.filesSelected = event.target.files.length;
    },
    prepareFormData() {
      this.formData = new FormData();
      this.formData.append("upload_preset", "nvcchf1d");
      // this.formData.append("tags", this.tags); // Optional - add tag for image admin in Cloudinary
      this.formData.append("file", this.fileContents);
    },
    addFoodToFirebase() {
      this.error = [];
      this.check();
      if (this.error.length == 0) {
      }
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
      if (!this.file) {
        this.error.push("Vui lòng chọn hình ảnh");
      }
    },
    upload() {
      this.error = [];
      this.check();
      if (this.error.length == 0) {
        //no need to look at selected files if there is no cloudname or preset
        console.log("upload", this.file.name);
        let reader = new FileReader();
        // attach listener to be called when data from file
        reader.addEventListener(
          "load",
          function() {
            this.fileContents = reader.result;
            this.prepareFormData();
            let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/pnvcc/upload`;
            let requestObj = {
              url: cloudinaryUploadURL,
              method: "POST",
              data: this.formData
            };
            axios
              .post(
                "https://api.cloudinary.com/v1_1/pnvcc/upload",
                this.formData
              )
              .then(data => {
                //add data to firebase
                console.log(data.data.url);
                db.collection("foods")
                  .add({
                    image: data.data.url,
                    public_id: data.data.public_id,
                    name: this.name,
                    price: this.price,
                    time: Date.now(),
                    date: date.getCurrentDay(),
                    description: this.description,
                    from: this.from,
                    category: this.category
                  })
                  .then(() => {
                    this.toast("Thêm sản phẩm thành công");
                    this.$router.push({ name: "M001Food" });
                  })
                  .catch(err => {
                    this.error = err;
                    console.log(err);
                  });
              })
              .catch(err => {
                this.error = err;
                console.log(err);
              });
          }.bind(this),
          false
        );
        // call for file read if there is a file
        if (this.file && this.file.name) {
          reader.readAsDataURL(this.file);
        }
      }
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