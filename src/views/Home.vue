<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route);
    console.log(`name: `, this.$route.params.name)
    console.log(`id: `, this.$route.params.id)
  }
}
</script>
