<template>
  <b-card 
    title="Check Status"
    style="margin-left: 25%; margin-right: 25%;">
    <b-form>
      <b-form-group label="Your License Plate">
        <b-form-input
          v-model="plate"
          required
          placeholder="Enter Plate Number"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <b-button variant="success" @click="checkInfo">
      Check Info
    </b-button>
    <b-card-text v-if="user" style="margin-top: 30px">
      <b>Name:</b> {{ user.name }}
    </b-card-text>
    <b-card-text v-if="user">
      <b>Expires At:</b> {{ dateString }}
    </b-card-text>

  </b-card>
</template>

<script>
import services from '../services';
export default {
  name: 'users',
  data (){
    return ({
      user: null,
      plate: "",
      dateString: null
    });
  },
  methods: {
    async checkInfo() {
      let r = await services.getInfo({plate: this.plate});
      if (r.data[0]) {
        this.user = r.data[0];
        this.dateString = new Date(r.data[0].expires).toString();
      } else {
        this.$bvToast.toast(`No parking space found`, {
          title: 'No Parking',
          autoHideDelay: 5000
        })
      }
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
