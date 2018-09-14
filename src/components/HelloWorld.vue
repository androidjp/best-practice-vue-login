<template>
  <div class="hello">
    <h1>{{user}}, 你好~</h1>
    <Button @click='logOut'>LogOut</Button>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'HelloWorld',
    data () {
      return {
        user: '',
      };
    },
    computed: {
      ...mapState({
        authType: state => state.authType,
        token: state => state.token,
      }),
    },
    created () {
      // 当主页刷新时，如果服务端设置的cookie（包含sessionId）
      // 的时效到了的话，便会提示未登录
      let methodName = (this.authType === 'SESSION' ? 'session' : 'token');
      this.$rest.user[methodName](null).then(res => {
        if (!res[methodName]) {
          this.userLogOut();
          this.$router.push('/login');
        } else {
          this.user = localStorage.getItem('user');
        }
      })
        .catch(err => {
          this.$Message.error(`${err.message}`, 'ERROR!');
        });
    },
    methods: {
      ...mapActions({
        userLogOut: 'userLogOut',
      }),
      logOut () {
        switch (this.authType) {
          case 'SESSION':
            this.$rest.user.logout(null).then(res => {
              if (res.success || !res.session) {
                this.userLogOut();
                this.$Message.success(res.message);
                this.$router.push('/login');
              }
            }).catch(err => {
              this.$Message.error(`${err.message}`, 'ERROR!');
            });
            break;
          case 'JWT':
            this.userLogOut();
            if (!this.token) {
              this.$router.push('/login');
              this.$Message.success('登出成功');
            } else {
              this.$Message.success('登出失败');
            }
            break;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
