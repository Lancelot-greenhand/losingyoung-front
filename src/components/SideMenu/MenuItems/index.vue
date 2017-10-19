<script>
  import _ from 'underscore'
  export default {
    props: {
      menuItems: {
        type: Array
      }
    },
    data () {
      return {
      }
    },
    computed: {
      items () {
        return this.menuItems // []
      }
    },
    render (h) {
      return h(
               'ul', {
                 attrs: {
                   class: 'l-menu'
                 }
               },
               this.renderLi(this.items, h)
               )
    },
    methods: {
      renderLi (items = [], h) {
        let hAry = []
        let ele
        items.forEach((item) => {
          let hrefOption = {
            attrs: {
              class: 'l-menu-link'
            },
            domProps: {
              innerHTML: item.title
            }
          }
          if (item.href) {
            hrefOption.attrs.href = item.href
          }
          // h('li', [h('a', option)]) 有子链接的情况
          if (_.isArray(item.children) && item.children.length > 0) {
            let ul = h('ul',
                       this.renderLi(item.children, h)
                       )
            ele = h('li', [h(
                             'a',
                             hrefOption
                           ), ul
            ])
          } else {
            ele = h('li', [h('a', hrefOption)])
          }
          hAry.push(ele)
        })
        return hAry
      }
    }
  }
</script>
<style scoped>
  ul{
    padding-left: 12px;
  }
  li{
    margin-top:6px;
  }
  .l-menu-link:hover{
    border-bottom: 2px solid #20a0ff;
  }
  .l-menu>li>a{
    font-weight: bold;
    font-size: 1.6rem;
  }
</style>
