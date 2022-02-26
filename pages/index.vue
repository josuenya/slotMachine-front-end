<template>
<div>
  <div class="hidden lg:flex text-center justify-center items-center text-sm "><p>pas prise en charge</p></div>
<div class="flex lg:hidden items-center justify-center">
  <div v-if="display_alert" class="fixed bg-black opacity-50 inset-0"></div>
  <div class="p-5 lg:p-9 w-full lg:w-1/3 min-h-screen">
    <div class="rounded-lg bg-transparent text-center px-5 py-14 min-h-full">
      <svg v-if="!the_game && !display_msg" @click="the_game = true" class="text-white outline-none rounded bg-blue-400 h-6 cursor-pointer w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <div class="mb-5 space-y-2">
        <img @click="default_page" class="w-20 cursor-pointer inline" src="../assets/img/logo.png" alt="">
        <div v-if="the_game">
          <h1 class="text-blue-300 text-xl font-bold">Bienvenue sur Essilor</h1>
          <h2>Mieux voir le monde</h2>
        </div>

        <div v-if="display_msg" class="text-center text-xl">
          <span>Nous vous remercions d'avoir pris part à notre jeu.</span>
        </div>
      </div>

      <div v-if="display" class="h-full min-w-0 bg-gradient-to-b from-blue-300 to-blue-200 p-5 rounded-lg text-white">
          <div v-if="the_game">
            <ValidationObserver ref="form" v-slot="{passes}">
            <form ref="form">
              <ValidationProvider v-slot="{errors}" tag="div" class="text-left space-y-2 mb-5" name="full_name"
                                rules="required">
                <label class="" for="name">Nom complet</label>
                <input type="text" v-model="full_name" class="text-black outline-none p-2 rounded w-full" placeholder="Nom complet">
                <div v-for="(error,i) in errors" :key="i" class="text-xs italic error">
                  {{ error }}
                </div>
            </ValidationProvider>

            <ValidationProvider v-slot="{errors}" tag="div" class="text-left space-y-2 mb-5" name="phone_number"
                                rules="required">
              <label for="name">Numéro de téléphone</label>
              <input type="text" class="text-black outline-none p-2 rounded w-full" v-model="phone_number" placeholder="Numéro de téléphone">
              <div v-for="(error,i) in errors" :key="i" class="text-xs italic error">
                {{ error }}
              </div>
            </ValidationProvider>

            <div @click.prevent="passes(continue_play)" class="mt-5 cursor-pointer text-left text-black font-bold bg-gradient-to-b from-yellow-100 via-orange-100 to-orange-200 rounded-full">
              <button type="submit" class="outline-none p-2 rounded w-full" value="">Continuer</button>
            </div>
            </form>
            </ValidationObserver>
          </div>

          <div v-else class="">
            <img class="inline" src="../assets/img/eclipse.png" alt="">

            <div class="shadown-white w-full border-2 border-gray-900 rounded-lg bg-gradient-to-b from-yellow-100 via-orange-100 to-orange-200 p-5">
                <div class="overflow-x-auto flex border-2 border-gray-900 bg-white rounded-lg">
                  <slot-machine @win="display_alert = true, youwin($event)" @lost="display_alert = true, youlost()" ref="game"></slot-machine>
                </div>
            </div>
          </div>
          <div v-if="!the_game" @click="play" class="mt-5 mx-20 cursor-pointer text-gray-900 font-bold bg-gradient-to-b from-yellow-100 via-orange-100 to-orange-200 rounded-full">
            <input type="button" class="outline-none p-2 rounded w-full" value="Jouer">
          </div>
      </div>
    </div>
  </div>
  <Alert :firstImage="first_image" :message="message" :secondImage="second_image" @close_alert="display_alert = false" v-if="display_alert" />
</div>
</div>

</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
export default {
  name: 'IndexPage',
  components: {
    ValidationProvider,
    ValidationObserver
  },

   data () {
    return {
      the_game: true,
      display_msg: false,
      display_alert: false,
      result: [],
      display: true,
      first_image: '',
      message: '',
      second_image: '',
      win: {
        first_image: require("@/assets/img/yusakp.png"),
        second_image: require("@/assets/img/win.png"),
      },
      lost: {
        img: require("@/assets/img/lost.png"),
      },
      full_name: null,
      phone_number: null
    }
  },
  methods: {
    play() {
      this.$refs.game.spin();
    },
    youwin(lot){
      this.message = lot.message
      this.first_image = this.win.first_image
      this.second_image = this.win.second_image
      this.display_msg = true
      this.display = false
    },
    youlost() {
      this.message = 'Désolé, vous avez perdu'
      this.first_image = this.lost.img
      this.second_image = ''
    },
    default_page () {
      this.the_game = true
      this.display_msg = false
      this.display = true
    },
    async continue_play() {
      console.log('game');
       this.the_game = false
      await this.$axios.$post('http://essilor.fun/api/check-player', {'phone_number': this.phone_number, 'full_name': this.full_name})
      .then(({data}) => {
        console.log(data);
        if (data.response == true){
          this.the_game = false
        }
        })
        .catch((e) => {
          console.log('login error', e.response)
        })
        .finally(() => {
         console.log('hhjhsdjf');
        })
    }
  },
}
</script>
