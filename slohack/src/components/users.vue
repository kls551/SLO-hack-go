<template>
  <div>
    <div>{{ JSON.stringify(users) }} </div>
  </div>
</template>

<script>
import services from '../services';
export default {
  name: 'users',
  data (){
    return ({
      users: []
    });
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers () {
      let user = await services.fetchUser();
      this.users = user.data;
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
