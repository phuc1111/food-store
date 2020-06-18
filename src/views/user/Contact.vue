<template>
  <div>
    <Navbar />
    <div class="contact-content">
      <h1>Bất kỳ câu hỏi nào cho chúng tôi</h1>
      <p>Địa chỉ: 101B Lê Hữu Trác, Sơn Trà, Đà Nẵng</p>
      <div class="alert-danger" v-if="error.length > 0">{{error[0]}}</div>
      <div class="contact-detail">
        <img
          class="image"
          src="https://dd7tel2830j4w.cloudfront.net/f1505468260832x993779528886079700/letter.svg"
          alt
        />
        <div class="form-question">
          <input type="text" class="form-control form-input" placeholder="Tên" v-model="name" />
          <input
            type="text"
            class="form-control form-input"
            placeholder="Địa chỉ"
            v-model="address"
          />
          <input
            type="number"
            class="form-control form-input"
            placeholder="Số điện thoại"
            v-model="phone"
          />
          <textarea
            type="text"
            class="form-control form-input"
            placeholder="Nhập câu hỏi của bạn"
            v-model="question"
          />

          <a href="#" class="btn btn-info active" role="button" @click="sendQuestion()">Gửi câu hỏi</a>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "../../components/Navbar";
import db from "@/firebase/init";
import date from "../../../autoCreate/date";
import Footer from "../../components/Footer";
export default {
  name: "Contact",
  components: {
    Navbar,

    Footer
  },
  data() {
    return {
      name: null,
      address: null,
      phone: null,
      question: null,
      error: []
    };
  },
  methods: {
    toast(content) {
      this.$bvToast.toast(content, {
        title: "Thành Công !",
        toaster: "b-toaster-bottom-left",
        solid: true,
        appendToast: true
      });
    },
    checkPhone(phone) {
      var reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      if (phone.match(reg)) {
        return true;
      } else {
        return false;
      }
    },
    check() {
      if (!this.name) {
        this.error.push("Vui lòng nhập tên!");
      }
      if (!this.address) {
        this.error.push("Vui lòng nhập địa chỉ!");
      }
      if (!this.phone) {
        this.error.push("Vui lòng nhập số điện thoại!");
      }
      if (!this.checkPhone(this.phone)) {
        this.error.push("Sai số điện thoại!");
      }
      if (!this.question) {
        this.error.push("Vui lòng nhập câu hỏi của bạn!");
      }
    },
    sendQuestion() {
      this.error = [];
      this.check();
      if (this.error.length < 1) {
        db.collection("questions")
          .add({
            name: this.name,
            address: this.address,
            phone: this.phone,
            question: this.question,
            date: date.getCurrentDay()
          })
          .then(() => {
            this.toast("Chúng tôi sẽ trả lời bạn trong thời gian sớm nhất!");
            this.phone = null;
            this.name = null;
            this.address = null;
            this.question = null;
          })
          .catch(err => {
            this.error.push(err.message);
          });
      }
    }
  }
};
</script>
<style>
.contact-detail {
  display: flex;
  margin: 50px 0;
}
.contact-content {
  max-width: 800px;
  margin: 70px auto;
}
.image {
  width: 50%;
}
.form-question {
  width: 50%;
}
.form-input {
  margin: 20px;
  border-radius: 15px;
}

@media only screen and (max-width: 46.24em) {
  .contact-content {
    margin: 20px auto;
    display: block;
  }
  .contact-detail {
    display: block;
    margin: 50px 0;
  }
  .form-question {
    width: 100%;
  }
  .form-input {
    margin: 20px auto;
    border-radius: 15px;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .contact-content {
    max-width: 700px;
    margin: 40px auto;
  }
}
</style>