import { useRef } from "react"
import { useDispatch } from "react-redux";
import { setFilterAction } from "../../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()
  const inputRef = useRef();

  const handleChange = () => {
    const inputValue = inputRef.current.value
    dispatch(setFilterAction(inputValue))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input ref={inputRef} onChange={handleChange} />
    </div>
  )
}

export default Filter