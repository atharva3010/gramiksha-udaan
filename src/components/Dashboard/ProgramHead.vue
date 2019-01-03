<template>
  <v-layout align-start justify-space-between row fill-height>
    <v-flex>
    <v-card
    hover
    dark
    v-if="thisShow"
    >
    <div style="padding-bottom:16px">
      <v-card-title>
        <h1 class="font-weight-thin">
          Cities
        </h1>
      </v-card-title>

      <v-chip 
      v-for="(data, index) in cities" :key='index' 
      outline color="white"
      @click="show"
      class="pa-2 ma-2"
      >
      <v-avatar color="#910000">{{index+1}}</v-avatar>
      {{data.city}} 
      </v-chip>

      <v-btn
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
      </v-dialog>
      <!-- <v-dialog
        v-model="dialog"
        width="300"
        height="600"
        dark
      >
          <v-card-title class="headline">Add a new City</v-card-title>
          <form @submit.prevent="addcity">
            <input type="text" placeholder="Add city" v-model="city">
          </form>
      </v-dialog> -->
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
        
      </v-btn>
    </div>
    </v-card>


    <v-card
    hover
    v-if="!thisShow"
    >
    <div style="padding-bottom:16px">
      <v-card-title>
        <h1 class="font-weight-thin">
          Schools
        </h1>
      </v-card-title>
        <v-chip color= "primary" text-color="white" class="pa-2 ma-2">Kanya</v-chip>

        <v-chip color="secondary" text-color="white" class="pa-2 ma-2">RC-Balak</v-chip>

        <v-chip color="red" text-color="white" class="pa-2 ma-2">RC-Kanya</v-chip>

        <v-chip color="green" text-color="white" class="pa-2 ma-2">MLB Girls</v-chip>

        <v-chip color="pink" text-color="white" class="pa-2 ma-2">Morar No.1</v-chip>

        <v-btn @click="show" absolute dark fab left bottom color="#910000" class="pa-2 ma-2"> 
          <v-icon>undo</v-icon> 
        </v-btn>

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
      </v-btn>
    </div>
    </v-card>


    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  name: "ProgramHead",
  data() {
    return {
      alert: true,
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      text: "Changes Saved",
      dialog: false,
      city: "",
      cities: [
        { city: "Gwalior" },
        { city: "Delhi" },
        { city: "Jaipur" },
        { city: "Bhopal" },
        { city: "Indore" }
      ],
      dialog: false,
      thisShow: true
    };
  },
  methods: {
    addcity() {
      this.cities.push({ city: this.city });
      this.city = "";
    },
    show() {
      this.thisShow = !this.thisShow;
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