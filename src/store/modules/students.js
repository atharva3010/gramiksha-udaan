export default {
    namespaced: true,
    state: {
        students:[
            {name:"0",rollno:0},
            {name:"1",rollno:1},
            {name:"2",rollno:2},
            {name:"3",rollno:3},
            {name:"4",rollno:4},
            {name:"5",rollno:5},
            {name:"6",rollno:6},                                                                                     
            {name:"7",rollno:7},                                                                                     
            {name:"8",rollno:8},                                                                                     
            {name:"9",rollno:9},                                                                                     
            {name:"10",rollno:10},                                                                                   
            {name:"11",rollno:11},                                                                                   
            {name:"12",rollno:12},                                                                                   
            {name:"13",rollno:13},                                                                                   
            {name:"14",rollno:14},                                                                                   
            {name:"15",rollno:15},                                                                                   
            {name:"16",rollno:16},                                                                                   
            {name:"17",rollno:17},                                                                                   
            {name:"18",rollno:18},                                                                                   
            {name:"19",rollno:19},                                                                                   
            {name:"20",rollno:20},                                                                                   
            {name:"21",rollno:21},                                                                                   
            {name:"22",rollno:22},                                                                                   
            {name:"23",rollno:23},                                                                                   
            {name:"24",rollno:24},                                                                                   
            {name:"25",rollno:25},                                                                                   
            {name:"26",rollno:26},                                                                                   
            {name:"27",rollno:27},
            {name:"28",rollno:28},
            {name:"29",rollno:29}
            
        ],
        attendence:[
            {rollno:1,status="P"}
        ],
        assessment:[
            {rollno:1,marks:{"Section1":1,"Section2":1,"Section3":1}}

        ]
    },
    mutations:{
        pushStudent(state,payload){
            state.students.push(payload);
        },
        pushAttendence(state,payload){
            state.attendence=payload;
        },
        pushAssessment(state,payload){
            state.assessment=payload;
        },
    },
    actions:{
        addStudent({commit},payload){
            commit("pushStudent",payload);
        },
        addAttendence({commit},payload){
            commit("pushAttendence",payload);
        },
        addAssessment({commit},payload){
            commit("pushAssessment",payload);
        }
    }


}