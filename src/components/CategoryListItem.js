import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

export default function ListItem({ label, active, id, removeCallback, editCallback }) {
  const icon = active ? faSquareCheck : faSquareXmark;
  const iconClass = `${active ? 'text-bg-success' : 'text-bg-danger'} me-3`;

  return(
    <li className="align-items-center d-flex justify-content-between list-group-item">
      <span className='ps-2'>{label}</span>
      <span>
        <span><FontAwesomeIcon icon={icon} className={iconClass} onClick={() => editCallback(id)} /></span>
        <button className="btn btn-sm btn-warning me-1">
          <FontAwesomeIcon icon={faPen} onClick={() => editCallback(id)} />
        </button>
        <button className="btn btn-sm btn-danger">
          <FontAwesomeIcon icon={faTrashCan} onClick={() => removeCallback(id)} />
        </button>
      </span>
    </li>
  )
}