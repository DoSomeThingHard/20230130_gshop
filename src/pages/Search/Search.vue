<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form" @submit.prevent="search">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input type="submit" class="search_submit" />
    </form>

    <section class="list" v-if="searchShops.length">
      <ul class="list_container">
        <!-- :to="'/shop?id='+item.id" -->
        <router-link :to="{ path: '/shop', query: { id: item.productId } }" v-for="item in searchShops" :key="item.productId" class="list_li">
          <section class="item_left">
            <!-- 由于有些网站会增加防盗链 最简单的解决方案 就是标签中添加 referrerPolicy='no-referrer'  -->
            <img :src="imgBaseUrl + item.imgUrl" class="restaurant_img" referrerPolicy="no-referrer" />
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.brandName }}+'|'+{{ item.productName }}</span>
              </p>
              <p>月售 {{ 0 || item.monthSaleCount }} 单</p>
              <p>
                {{
                  item.delivery_fee || item.float_minimum_order_amount
                }}
                元起送 / 距离{{ item.distance }}
              </p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

import BScroll from "better-scroll";

export default {
  data() {
    return {
      emptyResult: false,
      // imgBaseUrl: 'http://cangdu.org:8001/img/',
      imgBaseUrl: "https://pic.banggo.com/",
      keyword: "",
    };
  },

  computed: {
    ...mapState("shopOptions", ["searchShops"]),
  },

  methods: {
    search() {
      const keyword = this.keyword.trim();
      if (keyword) {
        this.$store.dispatch("shopOptions/searchShops", {keyword, callback:()=>{
          console.log('调用了')
        }});
      }
    },
  },

  watch: {
    searchShops(value) {
      // console.log(value)
      // console.log(this.searchShops)
      if (value && value.length > 0) {
        this.emptyResult = false;
      } else {
        this.emptyResult = true;
      }

      this.$nextTick(() => {
        if (this.scroll) {
          console.log("不需要创建");
          this.scroll.refresh();
        } else {
          console.log("创建了");
          console.log(this.searchShops.length);
          this.scroll = new BScroll(".list", {
            click: true,
          });
        }
      });
    },
  },

  components: {
    HeaderTop,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.search {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .search_form {
    clearFix();
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;

    input {
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;

      &.search_input {
        float: left;
        width: 79%;
        border: 4px solid #f2f2f2;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
      }

      &.search_submit {
        float: right;
        width: 18%;
        border: 4px solid #02a774;
        font-size: 16px;
        color: #fff;
        background-color: #02a774;
      }
    }
  }

  .list {
    position absolute
    top: 105px
    bottom: 50px
    overflow hidden   // 让超出的不显示

    .list_container {
      background-color: #fff;

      .list_li {
        display: flex;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid $bc;

        .item_left {
          margin-right: 10px;

          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }

        .item_right {
          font-size: 12px;
          flex: 1;

          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }

  .search_none {
    margin: 0 auto;
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
}
</style>
