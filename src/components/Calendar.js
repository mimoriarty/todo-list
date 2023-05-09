export default function Calendar({ value, name, label, changeFn }) {
  return(
    <div className="mb-3 col-3 col-sm-8">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        name={name}
        className="form-control border"
        type="datetime-local"
        defaultValue={value}
        onChange={changeFn}
      />
    </div>
  )
}