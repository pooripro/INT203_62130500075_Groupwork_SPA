<template>
  <div class="bg-cosmiclatte w-screen h-screen">
    <todolist> </todolist>
  </div>
</template>

<script>
import todolist from "../components/todolist.vue";

export default {
  components: {
    todolist,
  },

  mounted() {
    console.log(this.$route);
    console.log(`Home name: `, this.$route.params.name);
    console.log(`Home id: `, this.$route.params.id);
  },
};
</script>
