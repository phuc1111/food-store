<template>
  <div class>
    <div class="heartbeat chat" @click="checked()" v-if="check">
      <font-icon class="heartbeat" icon="comment-alt" />
    </div>

    <div class="form-chat" v-if="!check">
      <div class="top-chat">
        <p>Admin</p>
        <p @click="checked()">X</p>
      </div>
      <div class="content-chat">
        <div v-for="(message, i) in messages" :key="i">
          <div class="content-item-right" v-if="message.to != 'admin'">
            <p class="message-detail">{{message.content}}</p>
          </div>
          <div class="content-item-left" v-if="message.to == 'admin'">
            <p class="message-detail">{{message.content}}</p>
          </div>
        </div>
      </div>
      <div class="chatting">
        <input type="text" v-model="content" />
        <button type="button" class="btn btn-info" @click="sendMessage()">Send</button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import db from "@/firebase/init";
export default {
  name: "M002Chat",
  data() {
    return {
      check: true,
      close: true,
      content: null,
      phone: null,
      messages: []
    };
  },
  methods: {
    checked() {
      this.check = !this.check;
    },
    toast() {
      this.$bvToast.toast("Vui lòng nhập nội dung tin nhắn", {
        title: "Thông báo",
        toaster: "b-toaster-bottom-left",
        solid: true,
        appendToast: true
      });
    },
    closess() {
      this.close = !this.close;
    },
    sendMessage() {
      if (!this.phone) {
        this.$router.push({ name: "M003Login" });
      }
      if (this.content) {
        db.collection("messages")
          .add({
            from: localStorage.getItem("phone"),
            to: "admin",
            content: this.content,
            date: Date.now()
          })
          .then(() => {
            this.content = null;
          });
      } else {
        this.toast();
      }
    }
  },
  created() {
    this.phone = localStorage.getItem("phone");
    //get chat
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
    // console.log("message is: ", this.messages);
  }
};
</script>
<style>
.chat {
  width: 55px;
  height: 55px;
  position: fixed;
  right: 30px;
  bottom: 30px;
  color: #17a2b8;
  z-index: 1000;
  font-size: 40px;
  border-radius: 45px;
  border: 1.5px solid #17a2b8;

  /* box-shadow: 5px 5px 5px 5px rgba(60, 173, 56, 0.808); */
}
.heartbeat {
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
}
.form-chat {
  position: fixed;
  z-index: 1000;
  right: 30px;
  bottom: 10px;
  width: 262px;
  height: 330px;
  background: rgb(212, 206, 206);
  border: 1px solid rgb(119, 115, 115);
  transition: linear all 1s;
}
.top-chat {
  display: flex;
  justify-content: space-between;
  align-self: center;
  align-content: center;
  background: #17a2b8;
  color: #fff;
  height: 15%;
}
.content-chat {
  overflow: auto;
  background: #fff;
  color: rgb(22, 13, 13);
  height: 73%;
}
.chatting {
  bottom: 0;
  height: 12%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(119, 115, 115);
}

.content-item-right {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
  align-self: flex-end;
  height: 25px;
}
.content-item-left {
  color: #17a2b8;
  display: flex;
  justify-content: flex-start;
  margin: 5px;
  align-self: flex-start;
  height: 25px;
}

.animatedd {
  animation: swing-out-bottom-bck 0.45s cubic-bezier(0.6, -0.28, 0.735, 0.045)
    both;
}

@keyframes swing-out-bottom-bck {
  0% {
    transform: rotateX(0);
    transform-origin: bottom;
    opacity: 1;
  }
  100% {
    transform: rotateX(100deg);
    transform-origin: bottom;
    opacity: 0;
  }
}
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>