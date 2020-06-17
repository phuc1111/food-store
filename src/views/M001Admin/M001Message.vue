<template>
  <div class="message-management">
    <M001Leftmenu />
    <div class="message-content">
      <div class="chat-realtime" v-if="phone">
        <div class="show-phone">{{phone}}</div>
        <div class="content-chat">
          <div v-for="(message, i) in messages" :key="i">
            <div class="content-item-right" v-if="message.to == 'admin'">
              <p class="message-detail">{{message.content}}</p>
            </div>
            <div class="content-item-left" v-if="message.to != 'admin'">
              <p class="message-detail">{{message.content}}</p>
            </div>
          </div>
        </div>
        <div class="chatting">
          <b-form-textarea v-model="content"></b-form-textarea>
          <button type="button" class="btn btn-info" @click="sendMessage()">Send</button>
        </div>
      </div>
      <div class="list-chat">
        <div class="chat-item" v-for="(user, i) in users" :key="i">
          <b-avatar class="avatar-left"></b-avatar>
          <div class="right-avatar" @click="getMessage(user.phone)">
            <div>{{user.phone}}</div>
            <div>Has messages</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import db from "@/firebase/init";
export default {
  name: "M001Message",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      messages: null,
      phone: null,
      content: null,
      to: null,
      users: []
    };
  },
  methods: {
    toast() {
      this.$bvToast.toast("Vui lòng nhập nội dung tin nhắn", {
        title: "Thông báo",
        toaster: "b-toaster-bottom-left",
        solid: true,
        appendToast: true
      });
    },
    setPhone(phone) {
      console.log(phone);
      this.phone = phone;
    },
    getUser() {
      this.users = [];
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.data());
            let user = doc.data();
            user.id = doc.id;
            this.users.push(user);
          });
        });
      console.log(this.users);
    },
    getMessage(phone) {
      this.phone = phone;
      this.messages = [];
      db.collection("messages")
        .where("from", "==", phone)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changed => {
            if (changed.type == "added") {
              this.messages.push(changed.doc.data());
            }
          });
        });
      var query = "admin" + this.phone;
      db.collection("messages")
        .where("from", "==", query)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changed => {
            if (changed.type == "added") {
              this.messages.push(changed.doc.data());
            }
          });
        });
    },
    sendMessage() {
      if (!this.content) {
        this.toast();
      }
      if (!this.phone) {
        this.toast();
      }
      if (this.content && this.phone) {
        db.collection("messages")
          .add({
            from: "admin" + this.phone,
            to: this.phone,
            content: this.content,
            date: Date.now()
          })
          .then(() => {
            this.content = null;
          });
      }
    }
  },
  // created() {
  //   this.getMessage(this.phone);
  // },
  mounted() {
    this.getMessage(this.phone);
    this.getUser();
  },
  computed: {
    // sortMessages() {
    //   if (this.messages.length > 0) {
    //     return this.messages.sort((a, b) => {
    //       console.log(a.date);
    //       console.log(b.date);
    //       return a.date < b.date;
    //     });
    //   } else {
    //     return this.messages;
    //   }
    // }
  }
};
</script>
<style>
.message-management {
  display: flex;
}
.message-content {
  margin: 50px 0;
  display: flex;
  width: 1200px;
}
.chat-realtime {
  max-height: 50vh;
  width: 70%;
  margin: 0 50px;
  border: 1px solid rgb(116, 111, 111);
}
.list-chat {
  width: 30%;
}
.card-chat {
  height: 80px !important;
}
.chat-item {
  display: flex;
  border: 1px solid rgb(105, 102, 102);
  align-self: center;
}
.show-phone {
  background: #17a2b8;
}
.avatar {
  width: 100px;
  height: auto;
}
.avatar-left {
  align-items: center;
  align-self: center;
}
.right-avatar {
  margin-left: 15px;
}
.content-item-right {
  color: #17a2b8;
  display: flex;
  justify-content: flex-start;
  margin: 5px;
  align-self: flex-start;
  height: 25px;
}
.content-item-left {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  align-self: flex-end;
  height: 25px;
}
</style>