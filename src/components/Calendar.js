export default function Calendar({ value, name, label, changeFn, error }) {
  return(
    <div className={Boolean(error) ? "mb-3 col-9 form-error" : "mb-3 col-9"}>
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        id={name}
        name={name}
        className="form-control border"
        type="datetime-local"
        value={value}
        onChange={(e) => changeFn(e)}
      />
    </div>
  )
}