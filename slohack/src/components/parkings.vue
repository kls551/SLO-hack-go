<template>
  <div>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        Buy parking space {{ form.space }} 
      </template>
      <div class="d-block">
        <b-form @submit="onSubmit">
          <b-form-group label="Your Name:">
            <b-form-input
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Your License Plate:">
            <b-form-input
              v-model="form.licensePlate"
              required
              placeholder="Enter License Plate"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Your Credit Info:">
            <b-form-input
              v-model="form.creditCard"
              required
              placeholder="Enter Payment"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Total Hours:">
            <b-form-input
              type="number"
              min=1
              v-model="form.totalHour"
              required
              placeholder="Enter Hours"
              @change="formChange"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Your Parking Space:">
            <b-form-input
              v-model="form.space"
              disabled
              placeholder="ID"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Expires:">
            <b-form-input
              v-model="DateString"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Price:">
            <b-form-input
              v-model="totalPriceString"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-button class="button" type="submit" variant="primary">Submit</b-button>
          <b-button class="button" @click="onReset" variant="danger">Reset</b-button>
        </b-form>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
    </b-modal>

    <b-card no-body>
      <b-tabs card>
        <b-card 
          class="legend">
          <div style="align-items: center">
          <div class="cb redd"/>
          <div>Occupied</div>
          </div>
          <div style="align-items: center">
          <div class="cb greenn"/>
          <div>Available</div>
          </div>
          <div style="float: left">Hourly Rate: $2</div>
        </b-card>

        <b-tab
          v-for="lvl in levels"
          :key="lvl.level"
          :title="JSON.stringify(lvl.level)" :active="lvl.level === 1 ? true : false" @click="getParkings(lvl.level)">
          <b-container class="b-con">
            <b-row class="parking-row">
              <b-col
                v-for="value in parkings.slice(0, 5)"
                :key="value.id"
                :class="value.taken ? 'not-available' : 'available'"
                @click="value.taken ? '' : openModal(value.id)"
              >
                {{ value.id }}</b-col>
            </b-row>

            <b-row class="parking-row-bot">
              <b-col
                v-for="value in parkings.slice(5)"
                :key="value.id"
                :class="value.taken ? 'not-available' : 'available'"
                @click="value.taken ? '' : openModal(value.id)"
              >
                {{ value.id }}</b-col>
            </b-row>
          </b-container>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

  
</template>

<script>
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
};

import services from '../services';
export default {
  name: 'parkings',
  data (){
    return ({
      curTab: 0,
      parkings: [],
      levels: [],
      form: {
        name: '',
        creditCard: '',
        space: 0,
        licensePlate: '',
        expires: new Date().addHours(1),
        totalHour: 1,
        totalPrice: 0
      },
      totalPriceString: "",
      DateString: ""
    });
  },
  async mounted() {
    await this.getParkings(1);
    await this.getLevels();
  },
  methods: {
    formChange() {
      this.form.totalPrice= this.form.totalHour * 2
      this.totalPriceString = "$"+this.form.totalPrice
      this.form.expires = new Date().addHours(this.form.totalHour)
      this.DateString = this.form.expires.toString();
    },
    async onSubmit() {
      let res = await services.postUser(this.form);
      this.getParkings(this.curTab)
      if (res.status === 200) {
        this.$bvToast.toast(`Parking Ticket Bought`, {
          title: 'Success!',
          autoHideDelay: 5000
        })
      }
    },
    onReset() {
      let prevSpace = this.form.space;
      this.form = {
        name: '',
        creditCard: '',
        licensePlate: '',
        space: prevSpace,
        expires: new Date().addHours(1),
        totalHour: 1,
        totalPrice: 0
      };
      this.totalPriceString = "$2";
      this.DateString = this.form.expires.toString();
    },
    openModal(id) {
      this.form.space = id
      this.form.totalPrice= this.form.totalHour * 2
      this.totalPriceString = "$"+this.form.totalPrice
      this.$bvModal.show('bv-modal-example');
      this.DateString = this.form.expires.toString();
    },
    async getLevels() {
      let level = await services.getLevel();
      this.levels = level.data;
      // alert(JSON.stringify(this.levels))
    },
    async getParkings (lvl) {
      this.curTab = lvl;
      let user = await services.getParkingByLevel({level: lvl});
      this.parkings = user.data;
    }
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
.button {
  margin: 10px;
}
.legend {
  width: 200px;
  float: left;
}
.b-con {
  width: 745px;
  height: 665px;
  padding-right: 70px;
  padding-left: 70px;
  padding-top: 15px;
  background: url('~@/assets/lot.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
