<template>
    <nav class="bg-brownycolors filter drop-shadow-xl font-chewy text-cosmiclatte text-2xl">
        <div class="flex flex-row justify-end py-2">
            <div class="pr-10">
                <p><router-link :to="home">Home </router-link></p>
            </div>
            <div class="pr-10">
                <p><router-link :to="about"> About </router-link></p>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['home', 'about'],

        mounted(){
            console.log(this.$route);
            console.log(`Home name: `, this.$route.params.name)
            console.log(`Home id: `, this.$route.params.id)
  }
    }
 
</script>

