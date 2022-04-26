<template>
  <div class="error">
    {{ this.text }}
    <button @click="$emit('hide')">Hide</button>
  </div>
</template>

<script>
export default {
  name: "Error",

  props: {
    // promenne z venku, neupravujeme
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.error {
  background: lightcoral;
  color: aliceblue;
  padding: 2em;
  width: fit-content;
}
</style>
