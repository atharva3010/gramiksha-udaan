<template>
  <v-container>
  
    <v-layout row wrap>
      <v-flex sm4 xs12>
        <div style="padding:25px;">
          <h1>{{school.name}}</h1>
          <h2 style="font-weight:300">{{school.address}}, {{school.city}}</h2>
          <p> Total No of Students : {{school.total}}</p>
  
          <v-chip v-for="cls in  classes" :key="cls.name">
            <v-avatar>
              <v-icon>people</v-icon>
            </v-avatar>
            {{cls.name}}
          </v-chip>
  
  
  
        </div>
  
      </v-flex>
      <v-flex sm8 xs12>
        <v-img style="border-radius:8px;" :src="school.url" height="400px"></v-img>
      </v-flex>
    </v-layout>
    <v-divider style="margin:35px 0px;"></v-divider>
    <h1 style="margin-left:15px;">Sessions</h1>
    <div v-if="ClassNotSelected">
      <h2 style="font-weight:300;margin-left:15px;">Select a Class</h2>
  
      <v-layout wrap row>
        <v-flex @click="SelectClass(cls)" v-for="cls in classes" :key="cls.name" md4 sm6 xs12>
          <v-card style="border-radius:8px;margin:15px;" hover>
            <v-layout row>
              <v-flex xs6>
                <v-card-text class="text-xs-center" style="margin-top:10px">
  
                  <h2>
                    {{cls.name}}</h2>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <h3 style="font-weight:300;">Students : <b>{{cls.Stregnth}}</b></h3>
  
                  <h3 style="font-weight:300;"> Sessions : <b> {{Object.keys(cls.sessions).length}}</b></h3>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
  
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
  
      <h2 style="font-weight:300;margin-left:15px;">Select a Session</h2>
  
      <v-layout wrap row>
        <v-flex v-for="session in SelectedClass.sessions" :key="session.no" md4 sm6 xs12>
          <v-card style="border-radius:8px;margin:15px;" hover>
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
  
                  <h3 style="font-weight:300;">Module : <b>{{session.module}}</b></h3>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
  
        </v-flex>
      </v-layout>
  
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      SelectedClass: null,
      ClassNotSelected: true
    };
  },
  computed: {
    school() {
      return this.$store.getters["school/getSchoolDetails"];
    },
    classes() {
      return this.$store.getters["school/getSchoolClasses"];
    }
  },
  methods: {
    SelectClass(cls) {
      this.SelectedClass = cls;
      console.log(this.SelectedSchool);
      this.ClassNotSelected = false;
    }
  }
};
</script>

