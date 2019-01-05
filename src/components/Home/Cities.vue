<template>
  <v-layout justify-space-between justify-space-around align-center wrap>
    <v-flex v-if="loading['cities']" sm12>
      <h1 style="text-align:center;padding: 179px 30%;">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
        <br>Loading, Please Wait
      </h1>
    </v-flex>
    <v-flex v-for="city in cities" :key="city.name" xs12 sm6 md4>
      <div style="margin:10px;">
        <v-hover>
          <v-card hover light slot-scope="{ hover }" :to="goto(city.name)">
            <v-img style="padding-top:50%;max-height:250px;min-height:250px;" :src="city.imgURL">
              <v-layout align-end fill-height pa-3 white--text>
                <div>
                  <div class="font-weight-light display-1">{{city.name}}</div>
                  <div class="font-weight-light subheading">Click to see schools.</div>
                </div>
              </v-layout>
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal title font-weight-light white--text px-3"
                  style="height: 100%; text-align:center;"
                  @click="show(city.name)"
                >{{ city.description }}</div>
              </v-expand-transition>
            </v-img>

            <!-- <v-btn
        absolute
        dark
        fab
        left
        bottom
        color="#910000"
        @click="dialog = true"
      >
      <v-icon>add</v-icon>
      </v-btn>

      <v-dialog v-model="dialog" dark max-width="290">
        <v-card>
          <v-card-title class="headline">Add a new City</v-card-title>
          <v-card-text>
            <v-flex xs12>
              <v-text-field
                label="Add City"
                v-model="city"
              >
              </v-text-field>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false" @click="addcity">Add City</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>!>

      <! <v-dialog
        v-model="dialog"
        width="300"
        height="600"
        dark
      >
          <v-card-title class="headline">Add a new City</v-card-title>
          <form @submit.prevent="addcity">
            <input type="text" placeholder="Add city" v-model="city">
          </form>
      </v-dialog> 

      <v-btn
        absolute
        dark
        fab
        right
        color="#910000"
        bottom
        @click="snackbar = true"
        >
        <v-icon>check</v-icon>
            </v-btn>-->
          </v-card>
        </v-hover>

        <!-- <v-card hover v-if="!thisShow[city.name]">
          <div style="padding-bottom:50px">
            <v-card-title>
              <h1 class="font-weight-thin">Schools</h1>
            </v-card-title>

            <v-chip
              v-for="(item,index) in city.schools"
              :key="index"
              :color="color[(index)%5]"
              text-color="white"
              class="pa-1 ma-1"
            >{{item}}</v-chip>

            <v-btn @click="show" absolute dark fab left bottom color="#910000" class="pa-2 ma-2">
              <v-icon>undo</v-icon>
            </v-btn>

            <v-btn absolute dark fab right color="#910000" bottom @click="snackbar = true">
              <v-icon>check</v-icon>
            </v-btn>
          </div>
        </v-card>-->
        <!-- <v-snackbar v-model="snackbar" :timeout="timeout" :vertical="mode === 'vertical'">
          {{ text }}
          <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
        </v-snackbar>-->
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: "ProgramHead",
  data() {
    return {
      snackbar: false,
      mode: "",
      timeout: 6000,
      text: "Changes Saved",
      thisShow: {
        Gwalior: true,
        Bhopal: true,
        Delhi: true,
        Jaipur: true,
        Laxmangarh: true,
        Indore: true
      },
      color: ["primary", "secondary", "red", "green", "pink"]
    };
  },
  computed: {
    cities() {
      return this.$store.getters["city/getCities"];
    },
    loading() {
      return this.$store.getters["city/getLoading"];
    }
  },
  created() {
    this.$store.dispatch("city/getAllSchools");
  },
  methods: {
    addcity() {
      this.cities.push({ city: this.city });
      this.city = "";
    },
    goto(city) {
      city = city.toLowerCase();
      return "/" + city + "/schools";
    },
    show(cityname) {
      this.thisShow[cityname] = !this.thisShow[cityname];
    }
  }
};
</script>

<style scoped>
ul {
  text-align: left;
  font-size: 18px;
  list-style: none;
  margin: 0;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>