<template>
  <v-container grid-list-md>
    <div
      class="text-xs-center display-2 font-weight-light text-capitalize"
    >{{$route.params.city}} Schools</div>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="(school,index) in schools" :key="index">
        <div style="margin:10px;">
          <v-hover>
            <v-card hover slot-scope="{ hover }" :to="goto(school.name)" class="mx-auto" dark>
              <v-img
                style="padding-top:50%;max-height:250px;min-height:250px;"
                :src="images[index%6]"
              >
                <v-layout align-end fill-height pa-3>
                  <div>
                    <div class="font-weight-light">
                      <h1 class="font-weight-light display-1">{{ school.name }}</h1>
                    </div>
                  </div>
                </v-layout>
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal title font-weight-light white--text px-3"
                    style="height: 100%; text-align:center;"
                  >
                    <div>
                      <h4 class="font-weight-light display-1">{{ school.name }}</h4>
                      <span class="subheading font-weight-light">Click to open.</span>
                    </div>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "/static/images/schools/girl.jpg",
        "/static/images/schools/children.jpg",
        "/static/images/schools/boys.jpg",
        "/static/images/schools/classroom.jpg",
        "/static/images/schools/children2.jpg",
        "/static/images/schools/bookcase.jpg"
      ]
    };
  },
  computed: {
    city() {
      return this.$route.params.city;
    },
    schools() {
      return this.$store.getters["city/getSchools"];
    },
    loading() {
      return this.$store.getters["city/getLoading"];
    }
  },
  methods: {
    goto(school) {
      return "/" + this.$route.params.city + "/" + school;
    }
  },
  created() {
    this.$store.dispatch("city/getSchools", this.$route.params.city);
  }
};
</script>