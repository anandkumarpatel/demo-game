class Seq {
  constructor() {
    this.seq = [
      {
        color: 'red',
        label: 'red',
      },
      {
        color: 'blue',
        label: 'blue',
      },
      {
        color: 'yellow',
        label: 'yellow',
      },
      {
        color: 'green',
        label: 'green',
      },
    ]
    this.pointer = 0
  }

  selected(color) {
    const target = this.seq[this.pointer]
    if (color !== target.color) {
      this.pointer = 0
      return
    } else {
      this.pointer++
    }
  }

  isSolved() {
    return this.pointer === this.seq.length
  }
}
