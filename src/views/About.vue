<template>
  <div class="bg-cosmiclatte w-screen h-screen">
    <div class="pt-12">
      <div class="flex justify-center">
        <img
          src="../assets/logo.jpg"
          class="rounded-full h-72 w-72 flex items-center justify-center"
          width="300"
          height="300"
        />
      </div>
      <div class="pt-4">
        <p class="font-chewy text-5xl">{{ this.uname }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
    console.log(`route name: `, this.$route.params.name);
    console.log(`route id: `, this.$route.params.id);
    this.uname = this.$route.params.name;
    console.log(`attribute uname: ${this.uname}`);
  },

  data() {
    return {
      uname: "",
    };
  },
};
</script>