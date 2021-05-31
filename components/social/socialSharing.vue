<template>
  <div class="social-sharing">
    <el-popover
      placement="bottom"
      trigger="click">
      <div class="social-sharing__networks-container">
        <ShareNetwork
          class="social-sharing__network"
          v-for="(network, index) in networks"
          :key="index"
          :network="network.name"
          :url="url"
          :title="metaInfo.title"
          :description="metaInfo.desc"
          hashtags="ГИПП, детскиеСМИ, каталогСМИ"
        >
          <font-awesome-icon :icon="{ prefix: 'fab', iconName: network.icon }"></font-awesome-icon> {{ network.title }}
        </ShareNetwork>
      </div>
      <el-button slot="reference" type="primary" plain icon="el-icon-share"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    metaInfo: {
      type: Object,
      required: true
    }
  },
  created() {
    this.url = `${window.location.href}`
  },
  data() {
    return {
      url: '',
      networks: [
        {
          name: 'odnoklassniki',
          icon: 'odnoklassniki',
          title: 'Одноклассники'
        },
        {
          name: 'vk',
          icon: 'vk',
          title: 'Вконтакте'
        },
        {
          name: 'facebook',
          icon: 'facebook',
          title: 'Facebook'
        },
        {
          name: 'twitter',
          icon: 'twitter',
          title: 'Twitter'
        },
        {
          name: 'telegram',
          icon: 'telegram',
          title: 'Телеграм'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .social-sharing {
    &__networks-container {
      display: flex;
      flex-direction: column;
    }

    &__network {
      margin-bottom: 10px;
    }
  }
</style>
