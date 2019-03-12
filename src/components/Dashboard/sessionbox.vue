<template>
       <v-card style="border-radius:8px;margin:15px;" hover>
              <v-layout row>
                <v-flex xs6>
                  <v-card-text class="text-xs-center" style="margin-top:10px">
                    <h2>Session {{no}}</h2>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text>
                    <h3 style="font-weight:300;">
                      Date :
                      <b>{{date}}</b>
                    </h3>

                    <h3 style="font-weight:300;">
                      Module :
                      <b>{{title}}</b>
                    </h3>
                  </v-card-text>
                </v-flex>
                
              </v-layout>
              <v-layout row>
<v-flex xs12>
   <v-card-text style="padding-top: 0;" >
                    <h3 class="vol" :style="open?'max-height:48px;;':'max-height:0px'">
                      Volunteers :
                     <div > <b>{{volunteer}}</b></div>
                    </h3>
   </v-card-text>
</v-flex>
              </v-layout>
              
              <v-btn @click.stop="open=!open" fab right absolute small   style="margin-top: -20px;z-index:1" color="red" dark  ><v-icon :style="open?'    transform: rotate(180deg);':'    transform: rotate(0deg);'">keyboard_arrow_down</v-icon></v-btn>
            </v-card>
</template>
<script>
export default {
    props:['volunteer','title','date','no'],
    data(){
       return { open:false};
    }
}
</script>
<style>
.vol{
    overflow:hidden;
    font-weight: 300;
    transition: all 0.2s ease-out;
}
</style>

