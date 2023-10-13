<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          Validation ERRORS
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-gruop">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-gruop">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-gruop">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Write your article"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-gruop">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppArticleForm",
  props: {
    initalValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
      };
      this.$emit("articleSubmit", form);
    },
  },
};
</script>
