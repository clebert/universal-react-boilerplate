export default (state, {error, payload}) => {
  return error ? payload : null
}
