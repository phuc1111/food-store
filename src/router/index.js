import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/user/Home.vue";
import About from "../views/user/About.vue";
import Contact from "../views/user/Contact.vue";
import SeeFood from "../views/user/SeeFood.vue";
import Vegetable from "../views/user/Vegetable.vue";
// import Login from "../views/user/Login.vue";
import FoodDetail from "../views/user/FoodDetail.vue";
import M001Dashboard from "../views/M001Admin/M001Dashboard.vue";
import M001Food from "../views/M001Admin/M001Food.vue";
import M001Order from "../views/M001Admin/M001Order.vue";
import M001Customer from "../views/M001Admin/M001Customer.vue";
import M001Message from "../views/M001Admin/M001Message.vue";
import M001Comment from "../views/M001Admin/M001Comment.vue";
import M001Category from "../views/M001Admin/M001Category.vue";
import M001AddFood from "../views/M001Admin/M001AddFood.vue";
import M001UpdateFood from "../views/M001Admin/M001UpdateFood.vue";
import M001AddCategory from "../views/M001Admin/M001AddCategory.vue";

import M003Sigup from "../views/M003Login/M003Sigup.vue";
import M003Login from "../views/M003Login/M003Login.vue";


/* eslint-disable */
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/m001addfood/",
    name: "M001AddFood",
    component: M001AddFood
  },
  {
    path: "/dang-ky/",
    name: "M003Sigup",
    component: M003Sigup
  },
  {
    path: "/m001updatefood/:public_id",
    name: "M001UpdateFood",
    component: M001UpdateFood
  },
  {
    path: "/m001admin/",
    name: "M001Dashboard",
    component: M001Dashboard
  },
  {
    path: "/m001addcategory/",
    name: "M001AddCategory",
    component: M001AddCategory
  },
  {
    path: "/m001order/",
    name: "M001Order",
    component: M001Order
  },
  {
    path: "/m001food/",
    name: "M001Food",
    component: M001Food
  },
  {
    path: "/m001comment/",
    name: "M001Comment",
    component: M001Comment
  },
  {
    path: "/m001category/",
    name: "M001Category",
    component: M001Category
  },
  {
    path: "/m001customer/",
    name: "M001Customer",
    component: M001Customer
  },
  {
    path: "/m001message/",
    name: "M001Message",
    component: M001Message
  },
  {
    path: "/dang-nhap",
    name: "M003Login",
    component: M003Login
  },
  {
    path: "/chi-tiet",
    name: "FoodDetail",
    component: FoodDetail
  },
  {
    path: "/gioi-thieu",
    name: "About",
    component: About
  },
  {
    path: "/lien-he",
    name: "Contact",
    component: Contact
  },
  {
    path: "/rau-sach",
    name: "Vegetable",
    component: Vegetable
  },
  {
    path: "/hai-san",
    name: "SeeFood",
    component: SeeFood
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
