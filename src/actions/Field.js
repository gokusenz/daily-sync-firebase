import { ON_CHANGE } from '../actions/Types'

const onChange = (fieldName, text) => ({
  type: ON_CHANGE,
  payload: [fieldName, text],
})

export { onChange }
