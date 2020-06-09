import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/user/Home.vue";
import About from "../views/user/About.vue";
import Contact from "../views/user/Contact.vue";
import SeeFood from "../views/user/SeeFood.vue";
import Vegetable from "../views/user/Vegetable.vue";
import Login from "../views/user/Login.vue";
/* eslint-disable */
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dang-nhap",
    name: "Login",
    component: Login
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
