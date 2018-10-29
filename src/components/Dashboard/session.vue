<template>
    <v-container>
      <v-layout row><h1>Session 1</h1> <v-spacer></v-spacer><h3 class="date">Date 11-11-18 </h3></v-layout>
      <v-layout row><h2 class="classname">Class <b>Eighth</b></h2></v-layout>
      <v-divider style="margin:30px 0px;"></v-divider>
        <div>
    <v-tabs
      v-model="active"
      style="border-radius:8px;overflow:hidden;    box-shadow: 1px 4px 12px 1px rgba(197, 197, 197, 0.5);"
      slider-color="yellow"
    >
      <v-tab
        ripple
      >
        Attendence

      </v-tab>
       <v-tab
        ripple
      >
        Assessment 

      </v-tab>
      <v-tab-item>

      
      </v-tab-item>
       <v-tab-item>
        <v-card flat>
          <v-list>
            <v-list-tile > 
  <v-list-tile-avatar>Sno</v-list-tile-avatar>
  <v-list-tile-content><v-list-tile-title>Student name</v-list-tile-title></v-list-tile-content><v-spacer></v-spacer> Marks 
</v-list-tile>
<v-list-tile v-for="student in Marks" :key="student.roll"> 
  <v-list-tile-avatar><div style="color:white;border-radius:50%;font-weight:bold;height:25px;width:25px;background-color:#424242;" >{{student.rollno}}</div></v-list-tile-avatar>
  <v-list-tile-content><v-list-tile-title>{{ student.name}}</v-list-tile-title></v-list-tile-content>
  <v-list-tile-action>
<v-text-field  single-line type="number" v-model="student.marks" style="width:25px;height:20px;"></v-text-field>
  </v-list-tile-action>
</v-list-tile>

</v-list>
        </v-card>
        <v-btn @click="submitmarks()" primary > Submit </v-btn>
      </v-tab-item>
    </v-tabs>

 
  </div>
    </v-container>
</template>
<script>
export default {
  data() {
    return {
      Marks: {},
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    studentList() {
      return this.$store.getters["students/getStudentList"];
    }
  },
  created() {
    this.Marks = this.studentList;
    this.Marks.forEach(element => {
      element = { ...element, ...{ marks: 0 } };
    });
  },
  methods: {
    submitmarks() {}
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
</style>
