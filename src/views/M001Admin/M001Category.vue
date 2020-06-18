<template>
  <div class="cate-detail">
    <M001Leftmenu />
    <div class="content">
      <div class="top">
        <button type="button" class="btn btn-info" @click="addCate()">Thêm loại sản phẩm</button>

        <b-input-group>
          <b-form-input
            type="text"
            placeholder="Nhập tên loại để tìm"
            class="search-input"
            v-model="search"
          ></b-form-input>
          <b-input-group-prepend>
            <b-button variant="outline-info">Tìm</b-button>
          </b-input-group-prepend>
        </b-input-group>
      </div>

      <table class="table">
        <thead class="top-table">
          <tr>
            <th>STT</th>
            <th>Tên thể loại</th>
            <th>Mô tả</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cate, i) in getCateSearch" :key="i" class="item-detail">
            <td>{{i+1}}</td>
            <td>{{cate.name}}</td>
            <td>{{cate.description}}</td>
            <td>
              <div class="action">
                <font-icon icon="trash" class="delete" @click="deleteCate(cate.id)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import M001Leftmenu from "../../components/M001components/M001Leftmenu";
import db from "@/firebase/init";
export default {
  name: "M001Category",
  components: {
    M001Leftmenu
  },
  data() {
    return {
      categorys: [],
      error: null,
      search: null
    };
  },
  methods: {
    addCate() {
      this.$router.push({ name: "M001AddCategory" });
    },
    deleteLocal(id) {
      this.categorys = this.categorys.filter(cate => {
        return cate.id != id;
      });
    },
    deleteCate(id) {
      db.collection("categorys")
        .doc(id)
        .delete()
        .then(() => {
          this.deleteLocal(id);
        });
    }
  },
  created() {
    db.collection("categorys")
      .get()
      .then(data => {
        data.forEach(cates => {
          let category = cates.data();
          category.id = cates.id;
          this.categorys.push(category);
        });
      });
  },
  computed: {
    getCateSearch() {
      if (this.search) {
        return this.categorys.filter(cate => {
          return cate.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.categorys;
      }
    }
  }
};
</script>
<style scoped>
.cate-detail {
  display: flex;
}
.top {
  display: flex;
  justify-content: space-around;
}
.search-input {
  width: 400px;
}
.action {
  align-self: center;
  display: flex;
  justify-content: space-around;
}

.update {
  color: rgba(7, 124, 124, 0.548);
  font-size: 25px;
}
.update:hover {
  color: rgba(7, 124, 124, 0.842);
}
.delete {
  color: rgba(233, 34, 34, 0.657);
  font-size: 25px;
}
.delete:hover {
  color: rgba(233, 34, 34, 0.986);
}
.top-table {
  background: rgb(25, 147, 163);
}
.item-detail {
  transition: linear 1s;
}
.item-detail:hover {
  background: rgba(98, 157, 165, 0.733);
  border: 1.5px solid rgba(66, 153, 165, 0.733);
}
</style>