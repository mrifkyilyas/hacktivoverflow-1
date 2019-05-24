<template>
  <div class="container pt-4">
    <div class="d-flex flex-column">
      <div class="col">
        <h3>Jobs For You</h3>
      </div>
      <div
        class="col my-4 text-left"
        style="border-bottom:solid 1px #dadada"
        v-for="(job,index) in jobs"
        :key="index"
      >
        <div class="d-flex flex-column">
          <div>
            <a :href='job.url'  target="_blank" >
              <h6>{{job.title}}[{{job.type}}]</h6>
            </a>
          </div>
          <div>
            <small>
                <a :href='job.company.url' target="_blank">{{job.company}}</a>
            ,{{job.location}}</small>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
export default {
  data() {
    return {
      jobs: []
    };
  },
  created() {
    this.getJob();
  },
  methods: {
    getJob() {
      axios
        .get("user/getjob")
        .then(({ data }) => {
          this.jobs = data.slice(0,10);
          console.log(this.jobs, "ini adalah lamaran kerja");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

