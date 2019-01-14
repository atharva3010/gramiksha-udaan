<template>
  <section>
    <div class="text-xs-center display-2 font-weight-light text-capitalize">Cities</div>
    <v-layout justify-space-between justify-space-around align-center wrap>
      <v-flex v-if="loading['cities']" sm12>
        <h2 style="text-align:center;padding: 179px 30%;" class="font-weight-regular">
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>Udaan App is Loading
        </h2>
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
                    class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal title font-weight-light white--text px-3"
                    style="height: 100%; text-align:center;"
                    @click="show(city.name)"
                  >{{ city.description }}</div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </v-flex>
    </v-layout>
  </section>
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
</style>