<template>
  <v-container>
    <v-dialog style="float:left" v-model="dialog" width="500">
      <v-card>
        <form @submit.prevent="submitAddstudents">
          <v-card-title class="headline grey lighten-2" primary-title>Add Students</v-card-title>
          <v-flex v-for="(newstudent, index) in addStudentsList" :key="index" xs10 offset-xs1>
            <div style="display:flex">
              <v-text-field
                required
                :label="'Name of Student '"
                v-model="newstudent.name"
                :prefix="(index+1).toString()"
                id="Sname"
                type="text"
              ></v-text-field>
              <v-btn style="float:right;" @click="remAddStudent(index)" icon>
                <v-icon>close</v-icon>
              </v-btn>
            </div>
          </v-flex>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="addAddStudent()">add more Students</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="secondary">Submit</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
    <v-layout row>
      <h1>Session {{$route.params.session}}</h1>
      <v-spacer></v-spacer>
      <h3 class="date">Date {{sdate}}</h3>
    </v-layout>
    <v-layout row>
      <h2 class="classname">
        Class
        {{$route.params.class}}
      </h2>
      <v-spacer></v-spacer>
      <v-btn @click="dialog=true" color="primary" dark>Add students</v-btn>
      <v-btn flat slot="activator" @click=" dialog2 =true" color="red">Delete</v-btn>
      <v-dialog v-model="dialog2" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Add Students</v-card-title>
          <v-card-text>
            <h3
              class="font-weight-regular subheading"
            >Clicking on Yes will delete this session forever. This action is not reversible. Are you sure you want to continue?</h3>
          </v-card-text>
          <v-card-actions style="padding-bottom:25px;">
            <v-spacer></v-spacer>
            <v-btn color="red--text" @click="deleteSession()">Yes</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="dialog2=false">No</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-divider style="margin:30px 0px;"></v-divider>
    <signedout :dialog="!userSignedIn"></signedout>
    <div>
      <v-tabs v-model="active" color="transparent" slider-color="primary">
        <v-tab ripple>Lesson Plan</v-tab>
        <v-tab ripple>Students</v-tab>
        <v-tab ripple>Attendance</v-tab>
        <v-tab ripple>Assessment</v-tab>
        <v-tab-item>
          <v-card style="padding:25px;">
            <!-- <v-textarea
              v-if="editLessonPlan"
              :disabled="loading['lessonplan']"
              solo
              v-model="lessonplan.data"
              label="Write Lesson plan here"
            ></v-textarea>-->
            <froala class="px-5" :config="config" v-if="editLessonPlan" v-model="lessonplan.data"></froala>

            <froalaView
              v-model="lessonplan.data"
              v-if="(lessonplan.data != undefined || lessonplan.data == '') && !editLessonPlan"
            ></froalaView>
            <p
              v-if="!editLessonPlan && (lessonplan.data == undefined || lessonplan.data == '')"
            >Enter Lesson Plan here.</p>
            <!-- <p
              v-if="!editLessonPlan && lessonplan.data != ''"
              class="font-weight-light headline"
            >{{lessonplan.data}}</p>-->
            <!-- <p
              v-if="!editLessonPlan && lessonplan.data == ''"
              class="font-weight-light headline"
            >Please add a Lesson Plan.</p>-->
            <v-btn
              color="primary"
              v-if="!editLessonPlan && lessonplan.data != ''"
              @click="editLessonPlan = true"
              :disabled="loading['lessonplan']"
            >Edit</v-btn>
            <v-btn
              color="primary"
              v-if="!editLessonPlan && lessonplan.data == ''"
              @click="editLessonPlan = true"
              :disabled="loading['lessonplan']"
            >Add</v-btn>
            <v-btn
              v-if="editLessonPlan"
              :disabled="loading['lessonplan']"
              :loading="loading['lessonplan']"
              @click="pushLessonPlan"
            >Save</v-btn>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card hover>
            <div style="padding-bottom:16px">
              <v-list>
                <v-list-tile>
                  <v-list-tile-avatar>S.No.</v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Student name</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="(data,index) in attendance" :key="index">
                  <v-list-tile-avatar>
                    <h3 class="font-weight-light">{{index+1}}</h3>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <h3 class="font-weight-light">{{data.name}}</h3>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <!-- <v-btn slot="activator" @click="dialog=true" color="#910000" dark>Add students</v-btn> -->
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card hover dark>
            <div
              v-if="loading['attendance']"
              style="height: 100%;
                width: 100%;
                position: absolute;
                background-color: #00000069;
                z-index: 1;"
            >
              <!-- LODING OVERLAY  !-->
              <v-progress-circular
                style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div style="padding-bottom:16px">
              <v-list>
                <v-list-tile>
                  <v-list-tile-avatar>S.No.</v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Student name</v-list-tile-title>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>Attendance
                </v-list-tile>
                <v-list-tile v-for="(data,index) in attendance" :key="index">
                  <v-list-tile-avatar>
                    <v-chip>{{index+1}}</v-chip>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-chip>{{data.name}}</v-chip>
                  </v-list-tile-content>
                  <v-spacer></v-spacer>
                  <v-list-tile-action v-if="editAttendance">
                    <v-switch
                      style="text-transform: capitalize"
                      v-model="data.status"
                      color="white"
                    ></v-switch>
                  </v-list-tile-action>
                  <v-list-tile-action v-else>
                    <h3 class="font-weight-light text-capitalize" v-if="data.status">Present</h3>
                    <h3 class="font-weight-light text-capitalize" v-if="!data.status">Absent</h3>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <br>
              <v-btn
                color="#910000"
                @click="editAttendance=true"
                :disabled="loading['attendance']"
                v-if="!editAttendance"
                dark
              >Edit</v-btn>
              <v-btn
                color="#910000"
                @click="pushAttendance()"
                :disabled="loading['attendance']"
                :loading="loading['attendance']"
                v-if="editAttendance"
                dark
              >Submit</v-btn>
              <!-- <v-btn slot="activator" @click="dialog=true" color="#910000" dark>Add students</v-btn> -->
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card style="padding-bottom:16px;" flat>
            <div
              v-if="loading['assessment']"
              style="    height: 100%;
          width: 100%;
          position: absolute;
          background-color: #00000069;
          z-index: 1;"
            >
              <v-progress-circular
                style="position: absolute;top: calc(50% - 16px); left: calc(50% - 16px);"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>Sno / Student name</v-list-tile-content>
                <v-spacer></v-spacer>Marks
              </v-list-tile>
              <v-list-tile v-for="(student , index) in Marks" :key="index">
                <v-list-tile-content>
                  <v-chip>
                    <v-avatar class="grey">
                      <div style="color:white !important">{{index+1}}</div>
                    </v-avatar>
                    {{ student.name}}
                  </v-chip>
                </v-list-tile-content>
                <v-list-tile-action v-if="editAssessment">
                  <v-text-field
                    single-line
                    type="number"
                    class="font-weight-light"
                    v-model="student.marks"
                    style="width:25px;"
                  ></v-text-field>
                </v-list-tile-action>
                <v-list-tile-action v-else>
                  <h3 class="font-weight-light">{{ student.marks }}</h3>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <br>
            <v-btn
              color="primary"
              @click="editAssessment=true"
              :disabled="loading['assessment']"
              v-if="!editAssessment"
              dark
            >Edit</v-btn>
            <v-btn
              color="primary"
              :disabled="loading['assessment']"
              :loading="loading['assessment']"
              @click="pushAssessment()"
              v-if="editAssessment"
              dark
            >Submit</v-btn>
            <!-- <v-btn @click="dialog=true" color="primary" dark>Add students</v-btn> -->
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
    <v-snackbar
      v-model="snackbar.bar"
      :timeout="snackbar.timeout"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{ snackbar.text }}
      <v-btn color="pink" flat @click="snackbar.bar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import VueFroala from "vue-froala-wysiwyg";
import { mapState } from "vuex";
export default {
  data() {
    return {
      config: {
        events: {
          "froalaEditor.initialized": function() {}
        }
      },
      addStudentsList: [
        {
          name: ""
        }
      ],
      dialog: false,
      editLessonPlan: false,
      editAttendance: false,
      editAssessment: false,
      userSignedIn: false,
      dialog2: false,
      active: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters["students/getsnackbar"];
    },
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
    },
    goBack() {
      return this.$store.getters["students/getGoBack"];
    }
  },
  watch: {
    refresh(to) {
      //whenever refresh value is changed the records are fetched again ,after updating some thing like lesson plan
      if (to) {
        this.$store.dispatch("students/getStudents");
      }
    },
    goBack(to) {
      if (to) this.$router.go(-1);
      //when we want to go back to sessions page.like in case of deleting a session
    }
  },
  created() {
    let _this = this;
    this.$auth.onAuthStateChanged(user => {
      user = user ? true : false;
      if (!user) _this.userSignedIn = false;
      else _this.userSignedIn = true;
    });
    //when page is rendered we set session's identity in state from the url,then fetch the details from firebase by getStudents
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
      if (this.addStudentsList.length == 1) {
        this.addStudentsList[0].name = "";
        this.dialog = false;
        return;
      }
      this.addStudentsList.splice(index, 1);
    },
    addAddStudent() {
      this.addStudentsList.push({
        name: ""
      });
    },
    pushLessonPlan() {
      if (this.lessonplan.data === undefined) {
        this.lessonplan.data = "";
      }
      if (this.$store.dispatch("students/pushLessonPlan", this.lessonplan)) {
        this.editLessonPlan = false;
      }
    },
    pushAssessment() {
      if (this.$store.dispatch("students/pushAssessment", this.Marks)) {
        this.editAssessment = false;
      }
    },
    pushAttendance() {
      if (this.$store.dispatch("students/pushAttendance", this.attendance)) {
        this.editAttendance = false;
      }
    },
    deleteSession() {
      this.$store.dispatch("students/deleteSession");
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
</style>
