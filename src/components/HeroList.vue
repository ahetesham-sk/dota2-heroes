<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Heros"
          v-model="title"/>
        <div class="input-group-append">
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Heroes List</h4>
      <table style="width:700px" class="table table-responsive table-bordered">
      <thead>
        <th>Hero Image</th>
        <th>Hero Name</th>
        <th>PRO Win Rate</th>
        <th>PRO Pick Count</th>
        <th>PRO Ban Count</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredHeroes" :key="index">
          <td>
            <img width="80" height="60"  v-bind:src="'https://api.opendota.com' + item.img" >
          </td>
          <td>{{item.localized_name}}</td>
          <td>{{item.pro_win}}</td>
          <td>{{item.pro_pick}}</td>
          <td>{{item.pro_ban}}</td>
        </tr>
      </tbody>
    </table>
    </div>
   
  </div>
</template>

<script>
import HerosDataService from "../services/HerosDataService";

export default {
  computed: {
    filteredHeroes() {
      return this.heroes.filter((hero) => {
        return hero.localized_name.toLowerCase().includes(this.title.toLowerCase());
      });
    },
  },
  name: "heroes-list",
  data() {
    return {
      heroes: [],
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveHeroes() {
      HerosDataService.getAllHeroes()
        .then(response => {
          this.heroes = response.data.sort(function(a, b){
          return b.pro_win - a.pro_win;
        }).slice(0, 10);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveHeroes();
      this.currentIndex = -1;
    },
  },
  mounted() {
    this.retrieveHeroes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
