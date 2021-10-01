let Vue

class Store {
  constructor(options = {}) {
    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
    })

    // 保存用户配置的mutations选项
    this._mutations = options.mutations || {}
    // 保存用户编写的actions选项
    this._actions = options.actions || {}

    // 绑定commit上下⽂否则action中调⽤commit时可能出问题!!
    const store = this
    const { commit, action } = store
    this.commit = function bindCommit(type, paylod) {
      commit.call(store, type, paylod)
    }
    this.action = function bindAction(type, paylod) {
      action.call(store, type, paylod)
    }
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    throw new Error("不要直接修改state")
  }

  commit(type, paylod) {
    // 获取type对应的mutation
    const entry = this._mutations[type]

    if (!entry) {
      console.error(`unknown mutation type: ${type}`)
      return
    }

    // 指定上下文为Store实例
    // 传递state给mutation
    entry(this.state, paylod)
  }

  dispatch(type, paylod) {
    // 获取⽤户编写的type对应的action
    const entry = this._actions[type]

    if (!entry) {
      console.error(`unknown action type: ${type}`)
      return
    }

    // 异步结果处理常常需要返回Promise
    return entry(this, paylod)
  }
}

// 要解决的问题
// 将$store挂载到Vue.prototype
function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default { Store, install }
