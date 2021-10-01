let Vue

class MiniRouter {
  constructor(options) {
    this.$options = options

    // 保存当前hash
    // 必须是响应式
    // this.current='/
    Vue.util.defineReactive(this, "current", "/")

    // 监听hashchange事件变化
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1)
    })
  }
}

// plugin install 方法
MiniRouter.install = (_Vue) => {
  Vue = _Vue

  // 注册$router
  Vue.mixin({
    beforeCreate() {
      if (this.$options.route) {
        Vue.prototype.$router = this.$options.route
      }
    },
  })

  // 注册组件 <router-link></router-link>
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      // <router-link to='/'>home</router-link>
      return h(
        "a",
        {
          attrs: {
            href: `#${this.to}`,
          },
        },
        this.$slots.default
      )
    },
  })

  // 注册组件 <router-view></router-view>
  Vue.component("router-view", {
    render(h) {
      let component = null

      // 获取匹配的路由
      let route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      )

      if (route) {
        component = route.component
      }

      return h(component)
    },
  })
}

export default MiniRouter
