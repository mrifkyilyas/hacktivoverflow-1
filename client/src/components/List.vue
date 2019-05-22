<template>
  <div class="container-fluid mt-4">
    <div v-for="(question,index) in questions" :key="index" class="d-flex flex-column list">
      <div class="p-1">
        <div class="d-flex flex-row">
          <div class="p-1 col-1">
            <div class="d-flex flex-column">
              <div class="p-1">{{question.answers.length}}</div>
              <div class="p-1">Answer</div>
            </div>
          </div>
          <div class="p-1 col-1">
            <div class="d-flex flex-column">
              <div class="p-1">{{ question.upvotes.length - question.downvotes.length }}</div>
              <div class="p-1">Votes</div>
            </div>
          </div>
          <div class="p-1 col-8">
            <div class="d-flex flex-column">
              <div class="p-1 text-left">
                <router-link :to="'/question/'+question._id">
                  <a href>{{question.title}}</a>
                </router-link>
              </div>
              <div class="p-1">
                <div class="d-flex justify-content-between">
                  <div>
                    <a
                      href="#"
                      v-for="(tag,index) in question.tags"
                      :key="index"
                      class="btn btn-info tag"
                      @click.prevent="searchTag(tag)"
                    >{{tag}}</a>
                  </div>
                  <div>
                    <small>asked {{moment(question.createdAt).fromNow()}} by {{question.user.name}}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../api/axios";

export default {
  props: ["questions"],
  created() {
    console.log(this.questions, "ini adalah");
  },
  methods: {
    moment: function(date) {
      return moment(date);
    },
    searchTag(input) {
      this.$router.push("/question/tag/" + input);
    }
  }
};
</script>



<style scoped>
.list {
  border-bottom: 1px solid #dadada;
  border-top: 1px solid #dadada;
}
.tag {
  font-size: 10px;
  padding: 1px 3px 1px 3px;
  margin-left: 3px;
}
</style>



