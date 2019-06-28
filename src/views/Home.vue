<template>
  <div class='content'>
    <el-button type="danger" class="logout-btn" @click="logout">Wyloguj</el-button>
      <div class="search">
        <label for="Search">Tytuł filmy</label>
        <el-input id="search" name="search" v-model="searchValue"></el-input>
        <el-button type="info" v-on:click="getapi" >Szukaj</el-button> 
      <div class="poster">
        <h3>{{Title}}</h3><br>
        <span>{{Director}}</span><br>
        <span>{{Actors}}</span><br>
        <span>{{Runtime}}</span><br>
        <img id="poster-img" :src="Poster" />
      </div>
  </div>

  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
const API = 'http://www.omdbapi.com/?t=';   
const API_KEY = '&apikey=1f21d193';   

export default {
  name: 'home',
  data(){
    return{
      searchValue: '',
      Title:null,
      Poster:null,
      Director:null,
      Actors:null,
      Runtime:null,
      ref: firebase.firestore().collection('boards')
    }
  },
  methods:{
    logout: function() {
      firebase.auth().signOut().then(()=>{
        this.$router.replace('login')
      })
    },
    getapi:(function() {

    axios
        .get(`${API}${this.searchValue}${API_KEY}`)
        .then(response => {
                            (this.Poster = response.data.Poster),
                            (this.Title = response.data.Title),
                            (this.Director= response.data.Director),
                            (this.Actors= response.data.Actors),
                            (this.Runtime= response.data.Runtime)
                          }) 
        .catch((error) => {
        console.log(error);
    });
  }),
  }
}
</script>
<style  scoped>
    .content{
      margin: 0px;
      padding: 0px;
      background-image: url("../../hollywood.jpg");
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 80% 0%;
    }
    .search{
        display: flex;  
        flex-direction: column;
        width: 300px;
        padding-top: 50px;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
    }
    input{
        height: 30px;
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }
    td{
      width:150px;
      height: 50px;
    }
    
    .logout-btn{
      margin-top: 10px;
      float:right;
    }
    .poster{
      margin-left: auto;
      margin-right: auto;
      width: 300px;
    }
    .poster-img{
      display: block;
      margin: 0 auto 0 auto!important;
    }
</style>

