<template>
  <div class="SlotMachine">
    <div class="SlotMachine-reels">
      <div class="SlotMachine-shadow"></div>
      <div class="SlotMachine-payline"></div>
      <slot-reel class="border-r-4 border-yellow-100" ref="reel1" :canlock="canlock" v-on:stopped="reelStopped"></slot-reel>
      <slot-reel class="border-r-4 border-yellow-100" ref="reel2" :canlock="canlock" v-on:stopped="reelStopped"></slot-reel>
      <slot-reel class="border-r-4 border-transparent" ref="reel3" :canlock="canlock" v-on:stopped="reelStopped"></slot-reel>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      spend: 6,
      win: 0,
      resultData: false,
      canlock: true,
      waslocked: false,
      audio: {
        win: new Audio('https://freesound.org/data/previews/387/387232_1474204-lq.mp3'),
        bigwin: new Audio('https://freesound.org/data/previews/270/270319_5123851-lq.mp3')
      }
    }
  },
  beforeMount: function () {},
  mounted: function() {
    window.addEventListener('keydown', this.keydown)
  },
  methods: {
    keydown: function(e) {
      console.log(e.which)
      const key = {
        one: 49,
        two: 50,
        three: 51,
        space: 32
      }
      if (e.which === key.one) {
        this.$refs.reel1.lock()
        e.preventDefault()
      } else if (e.which === key.two) {
        this.$refs.reel2.lock()
        e.preventDefault()
      } else if (e.which === key.three) {
        this.$refs.reel3.lock()
        e.preventDefault()
      } else if (e.which === key.space) {
        this.spin()
        e.preventDefault()
      }
    },

    spin: function() {
        this.resultData = []
        this.$refs.reel1.run()
        this.$refs.reel2.run()
        this.$refs.reel3.run()
    },

    reelStopped(resultData, wasLocked){
      if (wasLocked) this.waslocked = wasLocked

      this.resultData.push(resultData)
      console.log('result data', this.resultData);
      if (this.resultData.length === 3) {
        this.checkWin(this.resultData)
        if (this.waslocked) {
          this.waslocked = false
          this.canlock = false
        } else {
          this.canlock = true
        }
      }
    },

    checkWin: function() {
      if (this.resultData.length === 3) { // ;-)
        const v1 = this.resultData[0]
        const v2 = this.resultData[1]
        const v3 = this.resultData[2]
        if(v1.name === v2.name && v2.name === v3.name) {
          if (v1.value >= 10) {
            this.audio.bigwin.play()
            this.$emit('win', {message: 'Bravo vous avez gagné le lot IPhone 13'})
          } else {
            this.audio.win.play()
            this.$emit('win', {message: 'Bravo vous avez gagné le lot: ' + v1.name})
          }
          this.waslocked = true
        }else {
          this.$emit('lost')
        }
      }
      this.resultData = false
    },
  },
}
</script>
