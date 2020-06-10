<template>
  <div class="footer">
    <div class="footer-item">
      <p class="title">Thông tin thêm</p>
      <ul class="list-group">
        <li class="list-group-item list-category">Về chúng tôi</li>
        <li class="list-group-item list-category">Giao hàng</li>
        <li class="list-group-item list-category">Sản phẩm</li>
      </ul>
    </div>
    <div class="footer-item">
      <p class="title">Thông tin chủ cửa hàng</p>
      <ul class="list-group">
        <li class="list-group-item list-category">Phone: 0364563569</li>
        <li class="list-group-item list-category">Email: abc@gmail.com</li>
        <li class="list-group-item list-category">Địa chỉ: 11b Lê Hữu Trác</li>
        <div class="icon">
          <font-awesome-icon :icon="['fab', 'facebook']" class="icon-item" />
          <font-awesome-icon :icon="['fab', 'twitter']" class="icon-item" />
          <font-awesome-icon :icon="['fab', 'linkedin']" class="icon-item" />
        </div>
      </ul>
    </div>
    <div class="footer-item">
      <div style="overflow:hidden;width: 300px;position: relative;">
        <iframe
          class="map"
          width="400"
          height="340"
          src="https://maps.google.com/maps?width=400&amp;height=340&amp;hl=en&amp;q=%C4%90%C3%A0%20N%E1%BA%B5ng+(Title)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
        <div
          style="position: absolute;width: 100%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"
        >
          <small style="line-height: 1.8;font-size: 2px;background: #fff;">
            Powered by
            <a href="https://embedgooglemaps.com/">Embedgooglemaps.com/</a> &
            <a href="https://ww.premiumlinkgenerator.com/">increase website traffic</a>
          </small>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style>
#gmap_canvas img {
  max-width: none !important;
  background: none !important;
}
.footer {
  display: flex;
  flex-wrap: wrap;
  max-width: 1500px;
  margin: 0 auto;
  justify-content: center;
}
.footer-item {
  width: 33.33%;
}
.icon {
  font-size: 35px;
}
.icon-item {
  margin: 5px;
}
.icon-item:hover {
  color: aqua !important;
}
.title {
  color: #17a2b8;
}
@media only screen and (max-width: 46.24em) {
  .footer-item {
    width: 100%;
  }
  .map {
    width: 100% !important;
    display: none;
  }
}
@media only screen and (min-width: 46.25em) and (max-width: 63.9375em) {
  .footer-item {
    width: 50%;
  }
  .map {
    width: 100% !important;
  }
}
</style>