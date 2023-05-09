import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import './TodoListItem.css';

export default function TodoListItem({
  todo,
  editFn,
  removeFn,
}) {
  const { name, state } = todo;

  return (
    <li className="list-group-item todo-item mb-1">
      <div className='d-flex'>
        <input
          type="text"
          className="form-control border me-2"
          name="name"
          value={name}
          readOnly={true}
        />
        <input
          className="form-check-input form-control-sm form-check-reverse me-2"
          type="checkbox"
          name="state"
          value={state === "done"}
          readOnly={true}
        />
        <button type="button" className="btn btn-warning btn-sm me-2">
          <FontAwesomeIcon icon={faPen} onClick={() => editFn(todo.id)} />
        </button>
        <button type="button" className="btn btn-danger btn-sm">
          <FontAwesomeIcon icon={faTrash} onClick={() => removeFn(todo.id)} />
        </button>
      </div>
    </li>
  );
}