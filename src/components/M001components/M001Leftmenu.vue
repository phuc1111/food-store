<template>
  <div class="dashboard">
    <router-link :to="{name: 'Home'}">Trang chủ</router-link>
    <div class="dashboard_tasks">
      <b-list-group>
        <router-link :to="{name: 'M001Dashboard'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="signal" />
              <div class="dashboard_tasks_content">Tổng quan</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Order'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="cart-plus" />
              <div class="dashboard_tasks_content">Đơn hàng</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Food'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="utensils" />
              <div class="dashboard_tasks_content">Sản Phẩm</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Comment'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="comments" />
              <div class="dashboard_tasks_content">Comment</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Message'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="comment-alt" />
              <div class="dashboard_tasks_content">Chat</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Customer'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="user" />
              <div class="dashboard_tasks_content">Khách hàng</div>
            </div>
          </b-list-group-item>
        </router-link>
        <router-link :to="{name: 'M001Category'}">
          <b-list-group-item>
            <div class="dashboard_tasks_detail">
              <font-icon icon="filter" />
              <div class="dashboard_tasks_content">Danh mục sản phẩm</div>
            </div>
          </b-list-group-item>
        </router-link>
      </b-list-group>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Dashboard",
  data() {
    return {
      tasks: ["Dashboard", "Comment", "Food", "User"],
      user: null,
      role: null
    };
  }
};
</script>
<style>
a {
  color: #2c3e50 !important;
  text-decoration: none !important;
}
a:hover {
  color: #17a2b8 !important;
}
.router-link-exact-active {
  color: #17a2b8 !important;
  text-decoration: none;
}
.dashboard {
  width: 320px !important;
  margin: 50px 0;
  border-right: 1px solid rgba(38, 164, 128, 0.92);
  height: 100%;
  /* position: fixed; */
}

.dashboard_user {
  display: flex;
  margin-bottom: 40px;
}
.dashboard_user_name {
  padding: 0 15px;
  align-self: center;
}
.dashboard_user_icon {
  font-size: 30px;
}
.dashboard_tasks_detail {
  display: flex;
  padding: 0;
  align-self: center;
  transition: linear 0.3s;
  text-decoration: none;
}
.dashboard_tasks_detail:hover {
  border-bottom: 1px solid #17a2b8;
  border-radius: 0px 40px 0px 0px;
}
.dashboard_tasks_content {
  margin-left: 10px;
}
.logout {
  position: absolute;
  top: 0;
  right: 10px;
}
@media only screen and (max-width: 768px) {
  .dashboard {
    width: 100%;
  }
}
/*table*/
@media only screen and (min-width: 768.01) and (max-width: 992px) {
}
</style>