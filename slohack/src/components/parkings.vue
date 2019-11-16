<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab
          v-for="lvl in levels"
          :key="lvl.level"
          :title="JSON.stringify(lvl.level)" active @click="getParkings(lvl.level)">
          
          <b-container class='my-5'>
            <b-row class="parking-row">
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
            </b-row>

            <b-row class="parking-row">
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
              <b-col class="not-available">2 of 2</b-col>
              <b-col class="available">1 of 2</b-col>
            </b-row>
          </b-container>
        </b-tab>
        <b-tab title="Level 2" @click="getParkings(2)">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

  
</template>

<script>
import services from '../services';
export default {
  name: 'parkings',
  data (){
    return ({
      parkings: [],
      levels: []
    });
  },
  mounted() {
    this.getLevels();
  },
  methods: {
    async getLevels() {
      let level = await services.getLevel();
      this.levels = level.data;
      // alert(JSON.stringify(this.levels))
    },
    async getParkings (lvl) {
      let user = await services.getParkingByLevel({level: lvl});
      this.parkings = user.data;
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
