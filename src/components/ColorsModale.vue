<script>
export default {
  name: "ColorsModale",
  props: ["showColorsModale", "toggleColorsModale"],
  emits: ["submitColor"],
};
</script>

<template>
  <div class="bloc-modale-colors" v-if="showColorsModale">
    <div class="overlay" @click="toggleColorsModale"></div>

    <div class="colors-options">
      <div id="color-yellow" @click="$emit('submitColor', 'yellow')"></div>
      <div id="color-green" @click="$emit('submitColor', 'green')"></div>
      <div id="color-purple" @click="$emit('submitColor', 'purple')"></div>
      <div id="color-blue" @click="$emit('submitColor', 'blue')"></div>
      <div id="color-red" @click="$emit('submitColor', 'red')"></div>
    </div>
  </div>
</template>




<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
.colors-options {
  position: absolute;
  width: 130px;
  height: 24px;

  bottom: 50px;
  left: 10px;
  z-index: 100;
  /* background: rgba(255, 255, 255, 0.5); */
  border-radius: 15px;
}

.colors-options div {
  display: inline-block;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: 2px 2px;
  border: 1px solid black;
  opacity: 0.6;
  cursor: pointer;
}

#color-yellow {
  background-color: rgb(226, 230, 17);
}
#color-red {
  background-color: rgb(231, 87, 62);
}
#color-purple {
  background-color: rgba(151, 48, 177);
}
#color-blue {
  background-color: rgb(17, 134, 230);
}
#color-green {
  background-color: rgb(101, 231, 62);
}

#color-yellow:hover {
  opacity: 0.9;
}
#color-red:hover {
  opacity: 0.9;
}
#color-purple:hover {
  opacity: 0.9;
}
#color-blue:hover {
  opacity: 0.9;
}
#color-green:hover {
  opacity: 0.9;
}
</style>