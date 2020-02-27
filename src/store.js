import SubX from 'subx'
import delay from 'timeout-as-promise'

const store = SubX.create({
  loading: false,
  async load () {
    this.loading = true
    await delay(3000)
    this.loading = false
  }
})

export default store
