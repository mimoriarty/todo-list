import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import './TodoListItem.css';

export default function TodoListItem({
  todo,
  editFn,
  removeFn,
  completeFn,
}) {
  const { name, completed, id } = todo;

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
          name="completed"
          value={completed}
          onChange={(e) => completeFn(e, id)}
        />
        <button type="button" className="btn btn-warning btn-sm me-2">
          <FontAwesomeIcon icon={faPen} onClick={() => editFn(id)} />
        </button>
        <button type="button" className="btn btn-danger btn-sm">
          <FontAwesomeIcon icon={faTrash} onClick={() => removeFn(id)} />
        </button>
      </div>
    </li>
  );
}