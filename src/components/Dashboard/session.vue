<template>
  <v-container>
  
    <v-layout row>
      <h1>Session {{$route.params.session}}</h1>
      <v-spacer></v-spacer>
      <h3 class="date">Date {{sdate}} </h3>
    </v-layout>
    <v-layout row>
      <h2 class="classname">Class <b>{{$route.params.class}}</b></h2>
    </v-layout>
    <v-divider style="margin:30px 0px;"></v-divider>
    <signedout></signedout>
    <div>
      <v-tabs v-model="active" color="transparent" slider-color="primary">
        <v-tab ripple>
          Lesson Plan
  
        </v-tab>
        <v-tab ripple>
          Attendance
  
        </v-tab>
        <v-tab ripple>
          Assessment
  
        </v-tab>
        <v-tab-item>
          <v-card style="padding:25px;">
            <div v-if="loading['lessonplan']" style="    height: 100%;
      width: 100%;
      position: absolute;
      background-color: #00000069;
      z-index: 1;">
              <v-progress-circular style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);" indeterminate color="primary"></v-progress-circular>
  
            </div>
            <v-textarea solo v-model="lessonplan.data" label="Write Lesson plan here"></v-textarea>
            <v-btn @click="pushLessonPlan"> Save </v-btn>
          </v-card>
  
        </v-tab-item>
        <v-tab-item>
          <v-card hover dark>
            <div v-if="loading['assessment']" style="    height: 100%;
      width: 100%;
      position: absolute;
      background-color: #00000069;
      z-index: 1;">
              <!-- LODING OVERLAY  !-->
  
              <v-progress-circular style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);" indeterminate color="primary"></v-progress-circular>
  
            </div>
            <div style="padding-bottom:16px">
  
              <v-list>
                <v-list-tile>
                  <v-list-tile-avatar>
                    S.No.
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Student name
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                  Attendance
                </v-list-tile>
                <v-list-tile v-for="(data,index) in attendance" :key="index">
                  <v-list-tile-avatar>
                    <v-chip>{{index+1}}</v-chip>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-chip>{{data.name}}</v-chip>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                  <v-list-tile-action>
                    <v-switch style="text-transform: capitalize" v-model="data.status" color="white">
                    </v-switch>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <br>
              <v-btn color="#910000" @click="pushAttendance()" dark> Submit </v-btn>
              <v-btn slot="activator" @click="dialog=true" color="#910000" dark> Add students </v-btn>
              <v-dialog style="float:left" v-model="dialog" width="500">
                <v-card>
                  <form @submit.prevent="submitAddstudents">
                    <v-card-title class="headline grey lighten-2" primary-title>
                      Add Students
                    </v-card-title>
  
  
  
                    <v-flex v-for="(newstudent, index) in addStudentsList" :key="index" xs10 offset-xs1>
                      <div style="display:flex">
                        <v-text-field required :label="'Name of Student '" v-model="newstudent.name" id="Sname" type="text"></v-text-field>
                        <v-btn style="float:right;" @click="remAddStudent(index)" v-if="index!=0" icon="">
                          <v-icon>close</v-icon>
                        </v-btn>
                      </div>
                    </v-flex>
  
  
  
                    <v-divider></v-divider>
  
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="addAddStudent()">add more Students</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" color="secondary">
                        Submit
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </form>
                </v-card>
              </v-dialog>
            </div>
          </v-card>
  
        </v-tab-item>
        <v-tab-item>
          <v-card style="padding-bottom:16px;" flat>
            <div v-if="loading['assessment']" style="    height: 100%;
      width: 100%;
      position: absolute;
      background-color: #00000069;
      z-index: 1;">
              <v-progress-circular style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);" indeterminate color="primary"></v-progress-circular>
  
            </div>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>Sno / Student name</v-list-tile-content>
                <v-spacer></v-spacer> Marks
              </v-list-tile>
              <v-list-tile v-for="(student , index) in Marks" :key="index">
  
                <v-list-tile-content>
                  <v-chip>
                    <v-avatar class="grey">
                      <div style="color:white !important">{{index+1}}</div>
                    </v-avatar>{{ student.name}}</v-chip>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-text-field single-line type="number"  v-model="student.marks" style="width:25px;"></v-text-field>
                </v-list-tile-action>
              </v-list-tile>
  
            </v-list>
            <br>
            <v-btn color="primary" @click="pushAssessment()" dark> Submit </v-btn>
            <v-btn @click="dialog=true" color="primary" dark> Add students </v-btn>
            <v-dialog style="float:left" v-model="dialog" width="500">
              <v-card>
                <form @submit.prevent="submitAddstudents">
                  <v-card-title class="headline grey lighten-2" primary-title>
                    Add Students
                  </v-card-title>
  
  
  
                  <v-flex v-for="(newstudent, index) in addStudentsList" :key="index" xs10 offset-xs1>
                    <div style="display:flex">
                      <v-text-field required :label="'Name of Student '" v-model="newstudent.name" id="Sname" type="text"></v-text-field>
                      <v-btn style="float:right;" @click="remAddStudent(index)" v-if="index!=0" icon="">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
  
  
  
                  <v-divider></v-divider>
  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="addAddStudent()">add more Students</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="secondary">
                      Submit
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </form>
              </v-card>
            </v-dialog>
          </v-card>
        </v-tab-item>
      </v-tabs>
  
  
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      addStudentsList: [
        {
          name: ""
        }
      ],
      dialog: false,
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    lessonplan() {
      return this.$store.getters["students/getLessonPlan"];
    },
    Marks() {
      return this.$store.getters["students/getAssessment"];
    },
    sdate() {
      return this.$store.getters["students/getDate"];
    },
    attendance() {
      return this.$store.getters["students/getAttendance"];
    },
    loading() {
      return this.$store.getters["students/getLoading"];
    },
    refresh() {
      return this.$store.getters["students/getRefresh"];
    }
  },
  watch: {
    $route(to, from) {
      console.log(to);
    },
    refresh(to) {
      //whenever refresh value is changed the records are fetched again ,after updating some thing like lesson plan
      if (to) {
        this.$store.dispatch("students/getStudents");
      }
    }
  },
  created() {
    this.$store.dispatch("students/setSession", {
      city: this.$route.params.city,
      school: this.$route.params.school,
      no: this.$route.params.session,
      class: this.$route.params.class
    });
    this.$store.dispatch("students/getStudents");
  },
  methods: {
    submitAddstudents() {
      this.$store.dispatch("students/addStudents", this.addStudentsList);
      this.dialog = false;
      this.addStudentsList = [
        {
          name: ""
        }
      ];
    },
    remAddStudent(index) {
      console.log(this.addStudentsList);
      this.addStudentsList.splice(index, 1);
    },
    addAddStudent() {
      this.addStudentsList.push({
        name: ""
      });
    },
    pushLessonPlan() {
      this.$store.dispatch("students/pushLessonPlan", this.lessonplan);
    },
    pushAssessment() {
      this.$store.dispatch("students/pushAssessment", this.Marks);
    },
    pushAttendance() {
      this.$store.dispatch("students/pushAttendance", this.attendance);
    }
  }
};
</script>

<style>
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
