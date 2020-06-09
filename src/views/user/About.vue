<template>
  <div>
    <Navbar />
    <Slide />
    <Footer />
  </div>
</template>
<script>
import Navbar from "../../components/Navbar";
import Slide from "../../components/Slide";
import Footer from "../../components/Footer";
export default {
  name: "About",
  components: {
    Navbar,
    Slide,
    Footer
  },
  data() {
    return {};
  }
};
</script>