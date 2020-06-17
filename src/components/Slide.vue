<template>
  <div class="slide">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="this.slides[0]" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <p>Các sản phẩm sạch 100% từ các nông trại.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="this.slides[0]" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <p>Chất lượng, uy tín là ưu tiên số 1 tại cửa hàng.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img :src="this.slides[0]" class="d-block w-100" />
          <div class="carousel-caption d-none d-md-block">
            <p>Hãy đăng nhập và mua ngay để được hưởng các ưu đãi của của hàng.</p>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Slide",
  data() {
    return {
      slides: [
        "https://eatrightpa.org/wp-content/uploads/2019/05/Mediterranean-Diet-Foods.5.29.19.jpg",
        "https://www.heart.org/-/media/aha/h4gm/article-images/mediterraneandiet2.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRdqmRqSGE8QhTX6G1P53E2VQPAbmLgTCrprt8NFlTr3Df18vVl&usqp=CAU"
      ]
    };
  }
};
</script>
<style>
.slide {
  max-width: 1500px;
  margin: 0 auto;
}
@media only screen and (max-width: 46.24em) {
  .slide {
    margin: 0 auto;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .slide {
    margin: 0 auto;
  }
}
</style>