<template>
  <div class="container">
    <form-wizard color="orange" step-size="xs" error-color="#a94442">
      <h2 slot="title"></h2>

      <tab-content title="Add Tags">
        <div>
          <h3>What languages, technologies, and/or frameworks is your question about?</h3>
          <p>Tags help the right people find and answer your question.</p>
          <div class="container">
            <div class="jumbooh text-left">
              <p>
                <strong>Identify your tags by completing the sentence, “My question is about…”</strong>
              </p>
              <p>
                <small>For example:</small>
              </p>
              <p>
                <i class="fa fa-check" aria-hidden="true" style="color:green"></i> Include tags that are crucial to your question only, like c#
              </p>
              <p>
                <i class="fa fa-times" aria-hidden="true" style="color:red"></i>
                Only include version numbers, like c#-4.0, when absolutely necessary
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-left">Tags</p>
          <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
        </div>
      </tab-content>
      <tab-content title="adding Title">
        <h2>What’s your question title?</h2>
        <p>Your title helps people quickly understand what your question is about so they can answer it.</p>
        <div class="container">
          <div class="jumbooh text-left">
            <p>Imagine you’re asking a question to another developer.</p>
            <p>
              <small>For example:</small>
            </p>
            <p>
              <i class="fa fa-check" aria-hidden="true" style="color:green"></i> “Is there an R function for finding the index of an element in a vector?”
            </p>
            <p>
              <i class="fa fa-times" aria-hidden="true" style="color:red"></i>“Please help with R”
            </p>
            <br>
            <p>
              <i class="fa fa-check" aria-hidden="true" style="color:green"></i> “How to fix ‘Headers already sent’ error in PHP”
            </p>
            <p>
              <i class="fa fa-times" aria-hidden="true" style="color:red"></i>“PHP error: Why isn’t this working?”
            </p>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input type="text" class="form-control" placeholder="Enter title" v-model="title">
        </div>
      </tab-content>
      <tab-content title="desctription">
        <h2>Tell us more about your question</h2>
        <p>Your description gives people the information they need to help you answer your question.</p>
        <p>
          <small>Want more help? Check out these examples of great question descriptions: Example 1, Example 2</small>
        </p>
        <wysiwyg v-model="description"></wysiwyg>
      </tab-content>
      <tab-content title="finish">
        <h2>Review your question</h2>
        <p>Almost there! Let’s give your question one more look. And don’t worry—you can edit your question after it’s posted, too.</p>
        <div class="jumbooh">
          <p>
            <small>
              <strong>Check for typos, slang, and code formatting issues.</strong>
            </small>
          </p>
          <p>
            <small>
              <i class="fa fa-check" aria-hidden="true" style="color:green"></i> Format your code: SELECT * FROM Users WHERE Id = 1;
            </small>
          </p>
          <p>
            <small>
              <i class="fa fa-times" aria-hidden="true" style="color:red"></i> Don’t include slang or shorthand: “u can’t bc it returns -1”
            </small>
          </p>
        </div>
        <br>
        <br>

        <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>

        <br>
        <br>
        <input type="text" class="form-control" placeholder="Enter title" v-model="title">
        <br>
        <br>
        <wysiwyg v-model="description"></wysiwyg>
      </tab-content>
      <button slot="prev" class="btn btn-primary">Back</button>
      <button slot="next" class="btn btn-primary">Next</button>
      <button slot="finish" class="btn btn-primary" @click.prevent="addQuestion">Post your question</button>
    </form-wizard>
  </div>
</template>




<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "../api/axios";

export default {
  components: {
    FormWizard,
    TabContent,
    VueTagsInput,
    wysiwyg: vueWysiwyg.default.component
  },
  data() {
    return {
      tag: "",
      tags: [],
      title: "",
      description: ""
    };
  },
  created(){
    if (!localStorage.access_token) {
      this.$router.push("/login");
    }


  },


  methods: {
    addQuestion() {
      let tagss = [];
      this.tags.map(e => {
        tagss.push(e.text.toLowerCase());
      });
      axios
        .post(
          `/question`,
          {
            title: this.title,
            description: this.description,
            tags: tagss
          },
          {
            headers: {
              access_token: localStorage.access_token
            }
          }
        )
        .then(({ data }) => {
          this.description = "";
          this.title = "";
          this.tags = [];

          this.$router.push(`/question/${data._id}`);
        })
        .catch(err => {
          this.text = "";
          this.title = "";
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.jumbooh {
  padding: 10px !important;
  background-color: #dadada !important;
}
</style>

