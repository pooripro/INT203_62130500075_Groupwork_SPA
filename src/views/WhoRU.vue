<template>
    <div class="bg-brownycolors w-screen h-screen" >
            <div class="filter drop-shadow-xl">
                <div class="pt-72">
                    <p class="font-chewy text-5xl text-cosmiclatte " >Who are you?</p>
                </div>
                <div class="pt-4">
                    <form @submit.prevent="submitForm">
                    <input class="rounded-full py-2 px-6" type="text">             
                    </form>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data(){
     return {
         enteredName: '',
         invalideInputName: false
     }
 },
    methods:{
        submitForm(){
            this.invalideInputName = this.enteredName === '' ? true : false
            if(this.enteredName !== ''){
                this.addNewUser({
                    name: this.enteredName
                })
            }
        },

        async addNewUser(users) {
        try {
            const res = await fetch(this.url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: users.name
                })
            })
            // const data = await res.json()
            // this.surveyResults = [...this.surveyResults, data]
        } catch (error) {
            console.log(`Could not save! ${error}`)
        }
    }
  }
}
</script>
