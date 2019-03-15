<template>
  <v-container grid-list-md>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ message }}
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <div
      class="text-xs-center display-2 font-weight-light text-capitalize"
    >{{$route.params.city}} Schools</div>
    <v-layout v-if="!schoolsLoading" row wrap>
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

      <v-flex
        @click="addFormVisible=true"
        style="
      height: 250px;
      width: 250px;
      "
        xs12
        sm6
        md4
      >
        <v-card hover class="addSchoolCard">
          <h1 class="font-weight-thin" style="text-align:center">Add School</h1>
        </v-card>
      </v-flex>
      <v-dialog v-model="addFormVisible" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Add School</v-card-title>
          <v-form>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-text-field v-model="newSchool.name" label="School name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field v-model="newSchool.address" label="Address" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="newSchool.principalname"
                    label="Name of the Principle"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-model="newSchool.contact"
                    label="Contact No. of The School"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <v-btn
              @click.prevent="addSchool"
              :loading="addingSchool"
              :disabled="addingSchool"
            >Submit</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout v-else class="text-xs-center mx-auto d-block">
      <h2 style="text-align:center;padding-top: 100px;" class="font-weight-regular">
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>Udaan App is Loading
      </h2>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      addFormVisible: false,
      images: [
        "/static/images/schools/girl.jpg",
        "/static/images/schools/children.jpg",
        "/static/images/schools/boys.jpg",
        "/static/images/schools/classroom.jpg",
        "/static/images/schools/children2.jpg",
        "/static/images/schools/bookcase.jpg"
      ],
      name: "",
      addingSchool: false,
      snackbar: false,
      schoolsLoading: false,
      message: "",
      newSchool: {
        address: "",
        classes: "",
        contact: "",
        principalname: "",
        imgurl:
          "https://i.ndtvimg.com/i/2018-04/delhi-school-photo_650x400_61524588287.jpg"
      }
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
    },
    addSchool() {
      this.snackbar = false;
      this.message = "";
      this.addingSchool = true;
      this.$store
        .dispatch("city/addSchool", {
          data: this.newSchool,
          city: this.$route.params.city
        })
        .then(() => {
          this.snackbar = true;
          this.message = "School Added Successfully";
          this.addingSchool = false;
          this.addFormVisible = false;
          this.$store.dispatch("city/getSchools", this.$route.params.city);
        })
        .catch(err => {
          console.log(err);
          this.snackbar = true;
          this.message = err;
          this.addingSchool = false;
        });
    }
  },
  created() {
    let _this = this;
    this.schoolsLoading = true;
    this.$store
      .dispatch("city/getSchools", this.$route.params.city)
      .then(() => {
        _this.schoolsLoading = false;
      });
  }
};
</script>

<style lang="scss">
.addSchoolCard {
  height: 250px;
  border: dashed 2px lightgray;
  border-radius: 4px;
  margin: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>