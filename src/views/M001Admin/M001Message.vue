<template>
  <div class="message-management">
    <M001Leftmenu />
    <div class="message-content">
      <div class="chat-realtime">
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
        <div class="chat-item">
          <b-avatar class="avatar-left"></b-avatar>
          <div class="right-avatar">
            <div>+84364097989</div>
            <div>Has messages</div>
          </div>
        </div>
        <div class="chat-item">
          <b-avatar class="avatar-left"></b-avatar>
          <div class="right-avatar">
            <div>+84846691716</div>
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
      messages: [],
      phone: null,
      content: null
    };
  },
  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
    getMessage(phone) {
      db.collection("messages")
        .where("from", "==", phone)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changed => {
            if (changed.type == "added") {
              console.log(changed.doc.data());
              this.messages.push(changed.doc.data());
            }
          });
        });

      db.collection("messages")
        .where("from", "==", "admin")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(changed => {
            if (changed.type == "added") {
              console.log(changed.doc.data());
              this.messages.push(changed.doc.data());
            }
          });
        });
    },
    sendMessage() {
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
      } else {
        this.$router.push({ name: "M003Login" });
      }
    }
  },
  created() {
    db.collection("messages")
      .where("from", "==", this.phone)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changed => {
          if (changed.type == "added") {
            console.log(changed.doc.data());
            this.messages.push(changed.doc.data());
          }
        });
      });

    db.collection("messages")
      .where("from", "==", "admin")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(changed => {
          if (changed.type == "added") {
            console.log(changed.doc.data());
            this.messages.push(changed.doc.data());
          }
        });
      });
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