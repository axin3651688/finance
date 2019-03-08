<template>
  <div class="PageTitle">
    <h3 class="page-title__name" v-if="routeName !== '消息'">
      <span class="page-title__name-text">{{routeName}}</span>
    </h3>
    <template v-else>
      <h3 class="page-title__name" v-if="miniType === 1101">
        <span class="page-title__name-text">{{receiverName}}</span>
        <div class="dropdown-wrap">
          <group-menu></group-menu>
        </div>
      </h3>
      <h3 class="page-title__name" v-else>{{receiverName}}</h3>
    </template>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'PageTitle',
  components: {
    GroupMenu: () => import('@mc/group_menu/GroupMenu.vue')
  },
  computed: {
    ...mapGetters(['messageStore']),
    miniType() {
      return this.messageStore.miniType;
    },
    routeName() {
      return this.messageStore.routeName;
    },
    receiverName() {
      let name = '';
      if (this.messageStore.sessionActiveItem) name = this.messageStore.sessionActiveItem.name;
      return name;
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@ms/index.scss";

  .page-title__name {
    padding: 0 30px;
    font-size: 18px;
    color: $colorText3;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .page-title__name-text {
    display: inline-block;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
