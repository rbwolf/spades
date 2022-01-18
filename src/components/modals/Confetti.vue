<template>
  <canvas ref="my-canvas"/>
</template>

<script>
export default {
  props: {
    showConfetti: {
      type: Boolean,
      default: false
    },
    canvasWidth: {
      type: Number,
      default: () => 370
    },
    canvasHeight: {
      type: Number,
      default: () => 200
    },
    confettiColors: {
      type: Array,
      default: () => [
        { front: 'lightred' },
        { front: 'lightblue' },
        { front: 'pink' },
        { front: '#44A9AF' },
        { front: '#BAA866' }
      ]
    },
    confettiCount: {
      type: Number,
      default: () => 200
    },
    gravity: {
      type: Number,
      default: () => 0.8
    }
  },
  data () {
    return {
      canvas: null,
      confetti: [],
      terminalVelocity: 5,
      drag: 0.075
    }
  },
  watch: {
    showConfetti (newValue) {
      if (newValue) this.renderConfetti()
    }
  },
  mounted () {
    this.canvas = this.$refs['my-canvas']
    // Resize the canvas to fit its parent's width.
    this.$refs['my-canvas'].width = this.$refs['my-canvas'].parentElement.clientWidth
    this.$refs['my-canvas'].height = this.$refs['my-canvas'].parentElement.clientHeight
    this.initConfetti()
  },
  methods: {
    randomRange (min, max) { return Math.random() * (max - min) + min },
    initConfetti () {
      for (let i = 0; i < this.confettiCount; i++) {
        this.confetti.push({
          color: this.confettiColors[Math.floor(this.randomRange(0, this.confettiColors.length))],
          dimensions: {
            x: this.randomRange(5, 10),
            y: this.randomRange(10, 20)
          },
          position: {
            x: this.randomRange(0, this.canvas.width),
            y: this.canvas.height - 1
          },
          rotation: this.randomRange(0, 2 * Math.PI),
          scale: {
            x: 1,
            y: 1
          },
          velocity: {
            x: this.randomRange(-25, 25),
            y: this.randomRange(0, -30)
          }
        })
      }
    },
    renderConfetti () {
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.confetti.forEach((confetto, index) => {
        const width = (confetto.dimensions.x * confetto.scale.x)
        const height = (confetto.dimensions.y * confetto.scale.y)
        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y)
        ctx.rotate(confetto.rotation)
        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * this.drag
        confetto.velocity.y = Math.min(confetto.velocity.y + this.gravity, this.terminalVelocity)
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
        // Set position
        confetto.position.x += confetto.velocity.x
        confetto.position.y += confetto.velocity.y
        // Delete confetti when out of frame
        if (confetto.position.y >= this.canvas.height) this.confetti.splice(index, 1)
        // Loop confetto x position
        if (confetto.position.x > this.canvas.width) confetto.position.x = 0
        if (confetto.position.x < 0) confetto.position.x = this.canvas.width
        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1)
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
        // Draw confetto
        ctx.fillRect(-width / 2, -height / 2, width, height)
        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0)
      })
      window.requestAnimationFrame(this.renderConfetti)
    }
  }
}
</script>