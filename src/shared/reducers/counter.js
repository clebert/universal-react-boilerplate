const decrement = counter => counter - 1
const increment = counter => counter + 1

export default (counter = 0, {type}) => {
  switch (type) {
    case 'DECREMENT_COUNTER': return decrement(counter)
    case 'INCREMENT_COUNTER': return increment(counter)
  }

  return counter
}
