<template>
    <v-container>
      <v-layout row><h1>Session 1</h1> <v-spacer></v-spacer><h3 class="date">Date 11-11-18 </h3></v-layout>
      <v-layout row><h2 class="classname">Class <b>Eighth</b></h2></v-layout>
      <v-divider style="margin:30px 0px;"></v-divider>
        <div>
    <v-tabs
      v-model="active"
      color="transparent"
      slider-color="primary"
    >
      <v-tab
        ripple
      >
        Attendance

      </v-tab>
       <v-tab
        ripple
      >
        Assessment 

      </v-tab>
      <v-tab-item>
      <v-card
        hover
        dark
      >
      <div v-if="loading['assessment']" style="    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #00000069;
    z-index: 1;">    <v-progress-circular style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);"
      indeterminate
      color="primary"
    ></v-progress-circular>

</div>
      <div style="padding-bottom:16px">
        <v-card-title>
          <h1 class="font-weight-thin">
              Attendance
          </h1>
        </v-card-title>
        <ul>
          <li v-for="(data,index) in attendance" :key='index'>
            <p>
              {{data.name}} {{index+1}}
              <v-switch
                style="text-transform: capitalize"
                :label="`Present: ${data.status.toString()}`"
                v-model="data.status"
                color="#910000"
              >
              </v-switch>
            </p>
          </li>
        </ul>
      </div>
      </v-card>
      
      </v-tab-item>
       <v-tab-item>
        <v-card flat> <div v-if="loading['assessment']" style="    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #00000069;
    z-index: 1;">    <v-progress-circular style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);"
      indeterminate
      color="primary"
    ></v-progress-circular>

</div>
          <v-list>
            <v-list-tile > 
  <v-list-tile-avatar>Sno</v-list-tile-avatar>
  <v-list-tile-content><v-list-tile-title>Student name</v-list-tile-title></v-list-tile-content><v-spacer></v-spacer> Marks 
</v-list-tile>
<v-list-tile v-for="(student , index) in Marks" :key="index"> 
  <v-list-tile-avatar><div style="color:white;border-radius:50%;font-weight:bold;width:25px;background-color:#424242;" >{{index+1}}</div></v-list-tile-avatar>
  <v-list-tile-content><v-list-tile-title>{{ student.name}}</v-list-tile-title></v-list-tile-content>
  <v-list-tile-action>
<v-text-field  single-line type="number" v-model="student.marks" style="width:25px;height:20px;"></v-text-field>
  </v-list-tile-action>
</v-list-tile>

</v-list>
        </v-card>
        <v-btn @click="pushAssessment()" primary > Submit </v-btn>
      </v-tab-item>
    </v-tabs>

 
  </div>
    </v-container>
</template>
<script>
export default {
  data() {
    return {
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    studentList() {
      return this.$store.getters["students/getStudentList"];
    },
    Marks() {
      return this.$store.getters["students/getAssessment"];
    },
    attendance() {
      return this.$store.getters["students/getAttendance"];
    },
    loading() {
      return this.$store.getters["students/getLoading"];
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
    }
  },
  created() {
    this.$store.dispatch("students/getStudents", {
      school: this.$route.params.school,
      no: this.$route.params.session,
      class: this.$route.params.class
    });
  },
  methods: {
    pushAssessment() {
      this.$store.dispatch("students/pushAssessment", this.Marks);
    }
  }
};
</script>
<style >
.classname {
  font-weight: 300;
}
.date {
  font-weight: 400;
  height: fit-content;
  padding: 3px 9px;
  margin-top: 7px;
  color: white;
  border-radius: 9px;
  background-color: rgb(66, 66, 66);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
