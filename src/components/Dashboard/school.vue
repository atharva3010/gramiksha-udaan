<template>
  <v-container>
 
    <v-layout  row wrap>
     
      <v-flex  v-if="!loading['school']" sm4 xs12>
        
        <div  style="padding:25px;">
          <h1>{{school.name}}</h1>
          <h2 style="font-weight:300">{{school.address}}, {{school.city}}</h2>
          <p  > Total No of Students : {{school.total}}</p>
  
          <v-chip v-for="(classdata,classname) in  classes" :key="classname">
            <v-avatar>
              <v-icon>people</v-icon>
            </v-avatar>
            {{classname}}
          </v-chip>
        </div>
  
      </v-flex>
      <v-flex v-if="!loading['school']" sm8 xs12>
        <v-img style="border-radius:8px;" :src="school.url" height="400px"></v-img>
      </v-flex>
      <v-flex  v-if="loading['school']" sm12>
        <h1  style=" text-align:center;   padding: 179px 30%;"><v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>Loading please wait </h1>
       
      </v-flex>
      
    </v-layout>
    <v-divider style="margin:35px 0px;"></v-divider>
    <h1 style="margin-left:15px;">Sessions</h1>
    <div v-if="SelectedClass==null">
      <h2 style="font-weight:300;margin-left:15px;">Select a Class</h2>
  
      <v-layout wrap row>
         <v-flex  v-if="loading['school']" sm12>
        <h1  style=" text-align:center;   padding: 80px 30%;"><v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>Loading please wait </h1>
      </v-flex>
        <v-flex  v-if="!loading['classes'] && !loading['school']" @click="SelectClass(classname)" v-for="(classdata,classname) in classes" :key="classname" md4 sm6 xs12>
          <v-card style="border-radius:8px;margin:15px;" hover>
            <v-layout row>
              <v-flex xs6>
                <v-card-text class="text-xs-center" style="margin-top:10px">
  
                  <h2>
                    {{classname}}</h2>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <h3 style="font-weight:300;">Students : <b>{{classdata.strength}}</b></h3>
  
                  <h3 style="font-weight:300;"> Sessions : <b> {{classdata.noofsession}}</b></h3>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
  
        </v-flex>
        <v-flex  v-if="loading['classes']" sm12>
       <h1  style=" text-align:center;   padding: 80px 30%;"><v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>Loading please wait </h1>
      </v-flex>
      </v-layout>
   
    </div>
   <div v-else>
  
      <v-layout row>
        <v-flex  v-if="loading['classes']" sm12>
        <h1  style=" text-align:center;   padding: 179px 30%;"><v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>Loading please wait </h1>
      </v-flex>
        <v-flex>
          <h2 style="float:left;font-weight:300;margin-left:15px;">Select a Session</h2>
        </v-flex>
      </v-layout>
      <v-btn @click="deselectClass()">
        <v-icon left>arrow_back</v-icon>
        Select Class
      </v-btn>
  
  
      <v-dialog style="float:right;" v-model="dialog" width="500">
  
        <v-btn slot="activator" @click="addSessionForm= true">
          <v-icon left>add</v-icon>
          Add Session
        </v-btn>
        <v-card>
          <form @submit.prevent="submitSession">
            <v-card-title class="headline grey lighten-2" primary-title>
              Add Session
            </v-card-title>
  
  
            <v-flex xs10 offset-xs1>
              <v-text-field label="Session Title" id="Sname" v-model="addSession.title" required type="text"></v-text-field>
            </v-flex>
  
            <v-flex  v-for="vol in addSession.volunteer " :key="vol.no" xs10 offset-xs1>
              <div style="display:flex">
                <v-text-field    
                                 required :label="'Username of Volunteer ' + vol.no" id="Sname" v-model="addSession.volunteer[vol.no-1].user" type="text"></v-text-field>
                <v-btn style="float:right;" v-if='vol.no!=1' @click="sessionRemvol(vol)" icon="">
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-flex>
  
  
  
            <v-divider></v-divider>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="sessionAddVol()">add Volunteer</v-btn>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="secondary">
                Submit
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
  
  
  
  
  
      <v-layout wrap row>
        <v-flex v-if="!loading['classes']" v-for="(session) in classes[SelectedClass].sessions" :key="session.no" @click="selectSession(session.no)"   md4 sm6 xs12>
          <v-card  style="border-radius:8px;margin:15px;" hover>
            <v-layout row>
              <v-flex xs6>
                <v-card-text class="text-xs-center" style="margin-top:10px">
  
                  <h2>Session {{session.no}}
                  </h2>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <h3 style="font-weight:300;">Date : <b>{{session.date}}</b></h3>
  
                  <h3 style="font-weight:300;">Module : <b>{{session.title}}</b></h3>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
  
        </v-flex>
      </v-layout>
  
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :vertical="mode === 'vertical'">
      {{ snackbartext }}
      <v-btn color="pink" flat @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      mode: "",
      timeout: 6000,
      snackbartext: "Changes Saved",
      dialog: false,
      addSessionForm: false,
      addSession: {
        volNo: 1,
        title: " ",
        volunteer: [
          {
            no: 1,
            user: ""
          }
        ]
      }
    };
  },
  computed: {
    refresh() {
      return this.$store.getters["school/getRefresh"];
    },
    school() {
      return this.$store.getters["school/getSchoolDetails"];
    },
    classes() {
      return this.$store.getters["school/getSchoolClasses"];
    },
    SelectedClass() {
      return this.$store.getters["school/getSelectedClass"];
    },
    loading() {
      return this.$store.getters["school/getLoading"];
    }
  },
  watch: {
    refresh(newval, oldval) {
      if (newval)
        this.$store.dispatch("school/getSessions", this.SelectedClass);
    }
  },
  created() {
    this.$store.dispatch("school/getSchool", {
      school: this.school.name,
      class: this.SelectedClass
    });
  },
  methods: {
    selectSession(selsession) {
      this.$store.dispatch("students/getStudents", {
        no: selsession,
        class: this.SelectedClass,
        school: this.school.name,
        city: this.school.city
      });
      this.$router.push("/dashboard/school/session");
    },
    SelectClass(cls) {
      this.$store.dispatch("school/getSessions", cls);
    },
    deselectClass() {
      this.$store.commit("school/deselectClass");
    },
    submitSession() {
      this.$store.dispatch("school/addSession", {
        data: this.addSession,
        class: this.SelectedClass
      });
      this.dialog = false;
      this.snackbar = true;
      this.snackbartext = "Session Added";
    },
    sessionAddVol() {
      this.addSession.volNo += 1;
      this.addSession.volunteer.push({
        no: this.addSession.volNo,
        user: ""
      });
    },
    sessionRemvol(vol) {
      this.addSession.volunteer.splice(
        this.addSession.volunteer.indexOf(vol),
        1
      );
      this.addSession.volNo -= 1;
    }
  }
};
</script>

