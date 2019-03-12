<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="!loading['school']" sm4 xs12>
        <div style="padding:25px;">
          <h1>{{school.name}}</h1>
          <h2 style="font-weight:300">{{school.address}}, {{school.city}}</h2>
          <p>Total No of Students : {{school.total}}</p>
          <v-btn dark color="green" :href="school.location">
            <v-icon>directions</v-icon>Get Directions
          </v-btn>
          <img
          v-if="user.schoolPhoto !== undefined && user.schoolPhoto !== ''"
          :src="user.schoolPhoto"
          width="150"
          alt
        >
        <img v-else src="/static/images/profile/profile.svg" width="150" alt>
        <br>
        <v-btn color="primary" @click="uploadCard=true">Edit School Photo</v-btn>
        <v-dialog v-model="uploadCard" width="525">
          <v-card id="upload" dark wrap>
            <v-card-title class="font-weight-light display-1">
              <div v-if="selectedFile === null">Please select a file to upload.</div>
              <div v-else>{{selectedFile.name}}</div>
            </v-card-title>
            <v-card-text>
              <input
                type="file"
                @change="onFileSelected"
                accept="image/*"
                ref="fileInput"
                style="display:none"
              >
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="$refs.fileInput.click()"
                v-if="selectedFile === null"
                color="purple"
                class="left mb-3"
                dark
              >Pick File</v-btn>
              <v-btn
                color="green"
                :loading="schoolPhotoLoading"
                class="mb-3"
                v-else
                dark
                @click="onUpload"
              >Upload</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="blue"
                class="mb-3"
                :disabled="schoolPhotoLoading"
                v-if="selectedFile !== null"
                dark
                @click="selectedFile=null;"
              >Clear Files</v-btn>
              <v-btn
                color="red"
                :disabled="schoolPhotoLoading"
                class="mb-3"
                dark
                @click="uploadCard=false; selectedFile=null;"
              >Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </div>
      </v-flex>
      <v-flex v-if="!loading['school']" sm8 xs12>
        <v-img style="border-radius:8px;" :src="school.url" height="400px"></v-img>
      </v-flex>
      <v-flex v-if="loading['school']" sm12>
        <h2 style="text-align:center;padding: 179px 30%;" class="font-weight-thin">
          <div class="sk-folding-cube">
            <div class="sk-cube1 sk-cube"></div>
            <div class="sk-cube2 sk-cube"></div>
            <div class="sk-cube4 sk-cube"></div>
            <div class="sk-cube3 sk-cube"></div>
          </div>School is Loading
        </h2>
      </v-flex>
    </v-layout>
    <v-divider style="margin:35px 0px;"></v-divider>
    <h1 style="margin-left:15px;">Sessions</h1>
    <div v-if="SelectedClass==null">
      <v-layout row>
        <h2
          v-if="Object.entries(classes).length === 0 && classes.constructor === Object"
          style="font-weight:300;margin-left:15px;"
          class="orange--text"
        >No Classes Added</h2>
        <h2 v-else style="font-weight:300;margin-left:15px;">Select a Class</h2>
        <v-spacer/>
        <v-dialog v-model="addclass" width="500">
          <v-card>
            <v-card-title style="font-weight:300" class="display-1">Add Class</v-card-title>
            <v-form>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  label="Class Name"
                  id="className"
                  v-model="className"
                  required
                  type="text"
                ></v-text-field>
              </v-flex>
              <v-btn @click="submitClass">Add Class</v-btn>
            </v-form>
          </v-card>
        </v-dialog>

        <v-btn @click="addclass=true">Add Class</v-btn>
      </v-layout>
      <v-layout wrap row>
        <v-flex v-if="loading['school']" sm12>
          <h2 style=" text-align:center;   padding: 80px 30%;" class="font-weight-thin">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>Session is Loading
          </h2>
        </v-flex>
        <v-flex
          @click="SelectClass(className)"
          v-for="(classdata,className) in classes"
          :key="className"
          md4
          sm6
          xs12
        >
          <div v-if="!loading['classes'] && !loading['school']">
            <v-card style="border-radius:8px;margin:15px;" hover>
              <v-layout row>
                <v-flex xs6>
                  <v-card-text class="text-xs-center" style="margin-top:10px">
                    <h2>{{className}}</h2>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text>
                    <h3 style="font-weight:300;">
                      Students :
                      <b>{{classdata.strength}}</b>
                    </h3>
                    <h3 style="font-weight:300;">
                      Sessions :
                      <b>{{classdata.noofsession}}</b>
                    </h3>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
        </v-flex>
        <v-flex v-if="loading['classes']" sm12>
          <h2 style=" text-align:center;   padding: 80px 30%;" class="font-weight-thin">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>Session is Loading
          </h2>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-layout row>
        <v-flex v-if="loading['classes']" sm12>
          <h2 style=" text-align:center;   padding: 80px 30%;" class="font-weight-thin">
            <div class="sk-folding-cube">
              <div class="sk-cube1 sk-cube"></div>
              <div class="sk-cube2 sk-cube"></div>
              <div class="sk-cube4 sk-cube"></div>
              <div class="sk-cube3 sk-cube"></div>
            </div>Session is Loading
          </h2>
        </v-flex>
        <v-flex v-if="!loading['classes']">
          <h2 style="float:left;font-weight:300;margin-left:15px;">Select a Session</h2>
        </v-flex>
      </v-layout>
      <v-btn v-if="!loading['classes']" @click="deselectClass()">
        <v-icon left>arrow_back</v-icon>Select Class
      </v-btn>
      <v-dialog v-if="!loading['classes']" style="float:right;" v-model="dialog" width="500">
        <v-btn slot="activator">
          <v-icon left>add</v-icon>Add Session
        </v-btn>
        <v-card>
          <form @submit.prevent="submitSession">
            <v-card-title class="headline grey lighten-2" primary-title>Add Session</v-card-title>
            <v-flex xs10 offset-xs1>
              <v-text-field
                label="Session Title"
                id="Sname"
                v-model="addSession.title"
                required
                type="text"
              ></v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1>
              <v-combobox
                v-model="addSession.volunteer"
                :items="usernamesInCity"
                chips
                label="Add Volunteers"
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    :selected="data.selected"
                    :disabled="data.disabled"
                    class="v-chip--select-multi"
                    @click.stop="data.parent.selectedIndex = data.index"
                    @input="data.parent.selectItem(data.item)"
                  >
                    <v-avatar class="primary white--text">{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-flex>
            <!-- <v-flex v-for="(vol,index) in addSession.volunteer" :key="index" xs10 offset-xs1>
              <div style="display:flex">
                <v-text-field
                  required
                  :label="'Username of Volunteer ' + (index+1)"
                  id="Sname"
                  v-model="addSession.volunteer[index].user"
                  type="text"
                ></v-text-field>
                <v-btn style="float:right;" @click="sessionRemvol(vol)" icon>
                  <v-icon>close</v-icon>
                </v-btn>
              </div>
            </v-flex>-->
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn flat color="primary" @click="sessionAddVol()">add Volunteer</v-btn>
              <v-spacer></v-spacer>-->
              <v-btn type="submit" color="secondary">Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>

      <v-layout wrap row>
        <v-flex
          v-for="(session) in classes[SelectedClass].sessions"
          :key="session.no"
          @click="selectSession(session.no)"
          md4
          sm6
          xs12
        >
          <div v-if="!loading['classes']">
            <SessionBox :no="session.no" :date="session.date" :title="session.title" :volunteer="session.volunteer"/>
       
          </div>
        </v-flex>
        <v-flex v-if="classes[SelectedClass].sessions.length == 0  " >
          <h3
            class="font-weight-light display-1 pt-4"
            style="text-align:center" >
            No sessions have been added yet.
            <br>
            <v-btn color="primary" flat @click="dialog = true">Add Session</v-btn>
          </h3>
        </v-flex>
      </v-layout>
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
import SessionBox from "./sessionbox"
export default {
  components:{
    SessionBox
  }
  ,
  data() {
    return {
    
      className: "",
      addclass: false,
      usernamesInCity: [],
      select: "",
      dialog: false,
      addSession: {
        volNo: 1,
        title: "",
        lessonplan: "",
        volunteer: []
      }
    };
  },
  computed: {
    snackbar() {
      return this.$store.getters["school/getsnackbar"];
    },
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
        this.$store.dispatch("school/getSessions", {
          class: this.SelectedClass,
          school: this.$route.params.school,
          city: this.$route.params.city
        });
    }
  },
  created() {
    if (!this.$store.getters["user/getIsSignedIn"]) this.$router.push("/login");
    this.$store.commit("school/deselectClass");
    this.$store.dispatch("school/getSchool", {
      school: this.$route.params.school,
      city: this.$route.params.city
    });
    this.$store
      .dispatch("user/getUsernamesFromCity", this.$route.params.city)
      .then(users => {
        this.usernamesInCity = users;
      });
  },
  methods: {
    async onUpload() {
      this.schoolPhotoLoading = true;
      var _this = this;
      var user = this.$auth.currentUser;
      var file = this.selectedFile;
      // console.log(file);
      // Create a Storage Ref w/ username
      var storageRef = this.$storage.ref(
        "/schoolPhoto/" + school.name + "/schoolPhoto.jpg"
      );
      // Upload file
      var task = await storageRef.put(file);
      var dURL = await storageRef.getDownloadURL();
      await this.$store.dispatch("user/updateUserDetails", {
        schoolPhoto: dURL
      });
      _this.schoolPhotoLoading = false;
      _this.selectedFile = null;
      _this.uploadCard = false;
      _this.$store.dispatch("setAlert", "School photo added successfully.");
    },
    onFileSelected(event) {
      console.log("fired");
      this.selectedFile = event.target.files[0];
    },
    rotateIcon(open){
console.log(open)
    },
    printsss(a){
      
console.log(a)
a.open=!a.open
    },
    submitClass() {
      console.log(className);
      this.$store.dispatch("school/addClass", {
        school: this.$route.params.school,
        city: this.$route.params.city,
        newClass: this.className
      }).then(()=>{
         this.$store.dispatch("school/getSchool", {
      school: this.$route.params.school,
      city: this.$route.params.city
    });
    this.addclass=false;
      })
    },
    selectSession(selsession) {
      this.$router.push(
        "/" +
          this.school.city +
          "/" +
          this.school.name +
          "/" +
          this.SelectedClass +
          "/" +
          selsession
      );
    },
    SelectClass(cls) {
      this.$store.dispatch("school/getSessions", {
        class: cls,
        school: this.$route.params.school,
        city: this.$route.params.city
      });
    },
    deselectClass() {
      this.$store.commit("school/deselectClass");
    },
    submitSession() {
      this.$store.dispatch("school/addSession", {
        data: this.addSession,
        class: this.SelectedClass,
        school: this.$route.params.school,
        city: this.$route.params.city
      });
      this.dialog = false;
    },
    sessionAddVol() {
      this.addSession.volNo += 1;
      this.addSession.volunteer.push({
        no: this.addSession.volNo,
        user: ""
      });
    },
    sessionRemvol(vol) {
      if (this.addSession.volunteer.length == 1) {
        this.addSession.volunteer[0].user == "";
        this.dialog = false;
        return;
      }
      this.addSession.volunteer = this.addSession.volunteer.filter(
        ele => ele.no != vol.no
      );
      // this.addSession.volunteer.splice(
      //   this.addSession.volunteer.indexOf(vol),
      //   1
      // );
      this.addSession.volNo -= 1;
    }
  }
};
</script>

<style scoped>
.sk-folding-cube {
  margin: 20px auto;
  width: 60px;
  height: 60px;
  position: relative;
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
  float: left;
  width: 50%;
  height: 50%;
  position: relative;
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(43, 43, 43);
  -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
  animation: sk-foldCubeAngle 2.4s infinite linear both;
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
  -webkit-transform: scale(1.1) rotateZ(90deg);
  transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
  -webkit-transform: scale(1.1) rotateZ(180deg);
  transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
  -webkit-transform: scale(1.1) rotateZ(270deg);
  transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.7s;
  animation-delay: 0.7s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%,
  10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%,
  75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  }
  90%,
  100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>


