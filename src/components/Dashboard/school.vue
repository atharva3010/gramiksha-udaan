<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-if="!loading['school']" sm4 xs12>
        <div style="padding:25px;">
          <h1>{{school.name}}</h1>
          <h2 style="font-weight:300">{{school.address}}, {{school.city}}</h2>
          <p>Total No of Students : {{school.total}}</p>
          <v-btn dark color="green" target="_blank" :href="school.location">
            <v-icon>directions</v-icon>Get Directions
          </v-btn>
          <br>
          <v-btn color="primary" @click="uploadCard=true">Edit School Photo</v-btn>
          <v-dialog v-model="uploadCard" width="525">
            <v-card wrap>
              <v-card-title
                primary-title
                style="background-color: indigo;"
                class="white--text headline"
              >Upload School Picture</v-card-title>
              <v-card-text class="font-weight-light title">
                <div v-if="selectedFile === null">Please select a file to upload.</div>
                <div v-else>{{selectedFile.name}}</div>
              </v-card-text>
              <v-card-text>
                <input
                  type="file"
                  @change="onFileSelected"
                  accept="image/*"
                  ref="fileInput"
                  style="display:none"
                >
              </v-card-text>
              <v-card-actions class="mx-2">
                <v-btn
                  @click="$refs.fileInput.click()"
                  v-if="selectedFile === null"
                  color="blue darken-3"
                  class="left mb-1"
                  dark
                >Pick File</v-btn>
                <v-btn
                  color="green accent-4"
                  :loading="schoolPhotoLoading"
                  class="mb-1"
                  v-else
                  dark
                  @click="onUpload"
                >Upload</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue"
                  class="mb-1"
                  :disabled="schoolPhotoLoading"
                  v-if="selectedFile !== null"
                  dark
                  @click="selectedFile=null;"
                >Clear Files</v-btn>
                <v-btn
                  color="red"
                  :disabled="schoolPhotoLoading"
                  class="mb-1"
                  dark
                  @click="uploadCard=false; selectedFile=null;"
                >Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
      <v-flex v-if="!loading['school']" sm8 xs12>
        <progressive-img
          style="border-radius:8px;"
          placeholder="data:image/jpeg;base64,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AQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADWQAAAAYAAAAAAAAAAAAAACIAAAAyAAAAEgBzAGMAaABvAG8AbABfAHAAbABhAGMAZQBoAG8AbABkAGUAcgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAMgAAACIAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAACIAAAAAUmdodGxvbmcAAAAyAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAAiAAAAAFJnaHRsb25nAAAAMgAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VI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YmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg1MjVjY2MwLTg3YjMtMTE3Yy05YjQ3LWM4ZTgyMmQ4ZWEyMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjZkNzI3MS1lMmFkLTQzYjYtOGE0MC1iODczNzFiMTBiMmUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMDVGRTJDRTIwM0M0MTc1M0RGNzRDNkM0QzM2QkYxQjIiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q9IkM3NUQxN0U1NzRCNTZFRjVEQkJFMzk5NEMwRTk3OTVDIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAxLTE0VDEzOjM3OjQyKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMy0xNVQxOTowMDoyMyswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMy0xNVQxOTowMDoyMyswNTozMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoTWFjaW50b3NoKSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJmMzZmZTc3LTQ2MmItNDM1Yi1hNjBkLTZhOTIzYzVmZWUxNiIgc3RFdnQ6d2hlbj0iMjAxOS0wMS0xNFQxMzozODo0NyswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NmQ3MjcxLWUyYWQtNDNiNi04YTQwLWI4NzM3MWIxMGIyZSIgc3RFdnQ6d2hlbj0iMjAxOS0wMy0xNVQxOTowMDoyMyswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JH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"
          :src="school.imgurl"
          height="400px"
          :aspect-ratio="0.67"
          alt
        ></progressive-img>
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
            <v-card-title
              primary-title
              style="background-color: indigo;"
              class="white--text headline"
            >Add Class</v-card-title>
            <v-form>
              <v-card-text>
                <v-flex xs10 offset-xs1>
                  <v-text-field
                    label="Class Name"
                    id="className"
                    v-model="className"
                    required
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ml-3 mb-2" @click="submitClass">Add Class</v-btn>
              </v-card-actions>
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
            <v-card-title
              class="headline white--text"
              primary-title
              style="background-color:indigo;"
            >Add Session</v-card-title>
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
            <SessionBox
              :no="session.no"
              :date="session.date"
              :title="session.title"
              :volunteer="session.volunteer"
            />
          </div>
        </v-flex>
        <v-flex v-if="classes[SelectedClass].sessions.length == 0  ">
          <h3
            class="font-weight-light display-1 pt-4"
            style="text-align:center"
          >No sessions have been added yet.
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
import SessionBox from "./sessionbox";
export default {
  components: {
    SessionBox
  },
  data() {
    return {
      className: "",
      addclass: false,
      usernamesInCity: [],
      select: "",
      selectedFile: null,
      uploadCard: false,
      dialog: false,
      schoolPhotoLoading: false,
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
        `/schoolPhotos/${_this.$route.params.city}/${
          _this.$route.params.school
        }/schoolPhoto.jpg`
      );
      // Upload file
      var task = await storageRef.put(file);
      var dURL = await storageRef.getDownloadURL();
      await this.$store.dispatch("school/updateSchoolDetails", {
        schoolPhotoURL: dURL,
        city: _this.$route.params.city,
        school: _this.$route.params.school
      });
      this.$store.dispatch("school/getSchool", {
        school: this.$route.params.school,
        city: this.$route.params.city
      });
      _this.schoolPhotoLoading = false;
      _this.selectedFile = null;
      _this.uploadCard = false;
      _this.$store.dispatch("setAlert", "School photo added successfully.");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    rotateIcon(open) {
      console.log(open);
    },
    printsss(a) {
      console.log(a);
      a.open = !a.open;
    },
    submitClass() {
      console.log(className);
      this.$store
        .dispatch("school/addClass", {
          school: this.$route.params.school,
          city: this.$route.params.city,
          newClass: this.className
        })
        .then(() => {
          this.$store.dispatch("school/getSchool", {
            school: this.$route.params.school,
            city: this.$route.params.city
          });
          this.addclass = false;
        });
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


