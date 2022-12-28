<style scoped>
/* Dashed border */
hr.dashed {
  border-top: 3px dashed #bbb;
}

/* Dotted border */
hr.dotted {
  border-top: 3px dotted #bbb;
}

/* Solid border */
hr.solid {
  border-top: 3px solid #bbb;
}

/* Rounded border */
hr.rounded {
  border-top: 8px solid #bbb;
  border-radius: 5px;
}
</style>
<template>
  <div>

	<h2 style="padding-left: 10px">Model Name</h2>
    <span style="padding-left: 10px"> {{ model_name }}</span>

	<br /><br /><br /><br /> 
    <h2 style="padding-left: 10px">Model URL</h2>
    <span style="padding-left: 10px"> <a  target="_blank" v-bind:href=code_link>{{ code_link }}</a></span>

    <br /><br /><br /><br />
    <h2 style="padding-left: 10px">Model Description</h2>
    <span style="padding-left: 10px"> {{ model_description }}</span>

    <br /><br /><br /><br />
    <h2 style="padding-left: 10px">Model Parameters Description</h2>
    <span style="padding-left: 10px"> {{ param_description }}</span>

	<br /><br /><br /><br />
    <h2 style="padding-left: 10px">Number of Total Parameters</h2>
    <span style="padding-left: 10px"> {{ total_param }}</span>

	<br /><br /><br /><br />
    <h2 style="padding-left: 10px">Number of Shared Parameters</h2>
    <span style="padding-left: 10px"> {{ shared_param }}</span>

	<br /><br /><br /><br />
  </div>
</template>
<script>
export default {
  name: "alue-slide",
  props: {
    model_name: String,
    code_link: String,
    model_description: String,
    param_description: String,
    shared_param: String,
    total_param: String,
  },
  data() {
    return {
      panelInstanceForm: {
        response: null,
      },
    };
  },
  // props: {
  // 	age: 30,
  // 	text: "test"
  // },
  methods: {},
};
</script>