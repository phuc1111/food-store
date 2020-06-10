<template>
  <div class="table">
    <h3>{{name}}</h3>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  name: "M001Count",
  props: ["items", "name"],
  data() {
    return {
      //   items: [
      //     {
      //       total_orders: 5,
      //       total_sales: 2,
      //       delivered_order: 2,
      //       rejected_order: 1,
      //       total_comments: 6
      //     }
      //   ]
    };
  }
};
</script>
<style>
.table {
  width: 100%;

  margin: 30px 5px;
}
</style>