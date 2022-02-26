<template>
  <transition name="modal" v-if="close">
    <div class="px-5 fixed z-20 top-0 bottom-0 left-0 overflow-y-auto right-0  flex items-center justify-center">
      <div class="relative">
        <div class="bg-white relative p-10 rounded-lg">
          <svg @click="$emit('close_alert')" class="cursor-pointer outline-none absolute top-5 right-3 close-btn text-blue h-8 w-8"
            viewBox="0 0 50.893 50.893" fill="#3f7afc">
            <g id="ICON-25" transform="translate(-11.92 -6.34)">
              <path id="Tracé_109" data-name="Tracé 109"
                    d="M37.328,57.233A25.413,25.413,0,1,1,55.34,49.819,25.446,25.446,0,0,1,37.328,57.233Zm0-46.783a21.406,21.406,0,1,0,.011,0Z"
                    transform="translate(0 0)"/>
              <path id="Tracé_110" data-name="Tracé 110"
                    d="M49.318,46.568c-2.417,2.412-4.73,4.746-7.081,7.042a2.888,2.888,0,0,1-1.372.747,1.892,1.892,0,0,1-2.086-1.106,1.98,1.98,0,0,1,.415-2.334c1.46-1.477,2.937-2.937,4.425-4.425l2.766-2.766c-.166-.177-.3-.332-.443-.476L39.3,36.611a1.991,1.991,0,0,1-.592-2.146,1.958,1.958,0,0,1,1.615-1.394,2.085,2.085,0,0,1,1.914.719c2.213,2.213,4.381,4.37,6.566,6.561a4.348,4.348,0,0,1,.4.553c.26-.249.409-.387.553-.553,2.213-2.213,4.453-4.459,6.7-6.677a2.025,2.025,0,0,1,3.446.857,2.1,2.1,0,0,1-.675,2.135c-2.213,2.18-4.387,4.37-6.583,6.55a3.214,3.214,0,0,1-.553.376,6.332,6.332,0,0,0,.553.553l6.638,6.638a2.019,2.019,0,0,1-.791,3.457,2.063,2.063,0,0,1-2.146-.636c-2.213-2.213-4.381-4.376-6.566-6.566A6.112,6.112,0,0,1,49.318,46.568Z"
                    transform="translate(-11.907 -11.922)"/>
            </g>
          </svg>
          <div class="mb-5 text-center">
            <img class="w-30 inline text-center" :src="firstImage" alt="">
            <p class="text-xl mb-3 text-blue-300">{{ message }}</p>
            <img class="w-34 inline text-center" :src="secondImage" alt="">
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
export default{
  name: 'Alert',

  props: ['firstImage', 'message', 'secondImage'],

  data() {
    return {
      close: true
    }
  },
  methods: {
    hidden() {
      console.log('close modal');
      this.close = !this.close
    },
  }

}
</script>


