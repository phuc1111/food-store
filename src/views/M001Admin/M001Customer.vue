<template>
  <div class="main-customer">
    <M001Leftmenu />
    <div class="customer">
      <div class="title">Danh sách khách hàng</div>
      <b-table striped hover :items="users"></b-table>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import db from "@/firebase/init";
export default {
  name: "M001Customer",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    db.collection("users")
      .get()
      .then(data => {
        data.forEach(doc => {
          let user = doc.data();

          this.users.push(user);
        });
      });
  }
};
</script>
<style>
.main-customer {
  display: flex;
}
.customer {
  margin: 60px 10px;
  width: 500px;
}
</style>