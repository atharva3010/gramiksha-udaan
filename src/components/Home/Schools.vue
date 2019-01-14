<template>
  <v-layout justify-space-between justify-space-around align-center wrap>
    <v-container grid-list-md>
      <div class="text-xs-center display-1 font-weight-light text-capitalize">
        {{$route.params.city}}
        <v-flex xs12 sm6 md4>
          <div style="margin:10px;">
            <v-hover>
              <v-card
                hover
                slot-scope="{ hover }"
                class="mx-auto"
                dark
              >
                <v-img style="padding-top:50%;max-height:250px;min-height:250px;" src="https://farm4.staticflickr.com/3636/3505969916_c908d7000d_b.jpg">
                  <v-layout align-end fill-height pa-3>
                    <div>
                      <div class="font-weight-light">
                        <h1> RC Balak </h1>
                      </div>
                    </div>
                  </v-layout>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal title font-weight-light white--text px-3"
                      style="height: 100%; text-align:center;"
                    >
                    <h2>RC Balak</h2>
                    <br>
                    Click to see more.
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-card>
            </v-hover>
          </div>
        </v-flex>
      </div>
    </v-container>
  </v-layout>
</template>

<script>

</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

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
  content: '';
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
  -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
}
.sk-folding-cube .sk-cube3:before {
  -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s; 
}
.sk-folding-cube .sk-cube4:before {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  } 
}

@keyframes sk-foldCubeAngle {
  0%, 10% {
    -webkit-transform: perspective(140px) rotateX(-180deg);
            transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
  } 25%, 75% {
    -webkit-transform: perspective(140px) rotateX(0deg);
            transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
  } 90%, 100% {
    -webkit-transform: perspective(140px) rotateY(180deg);
            transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
  }
}
</style>
