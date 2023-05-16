import React, { Component } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Calendar from "./Calendar";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: "",
      display: "none",
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  get title() {
    return this.props.todo?.id ? `Edit todo: ${this.props.todo?.name}` : "Add todo";
  }

  openModal() {
    this.setState({
      modalShow: "show",
      display: "block",
    })
  }

  closeModal() {
    this.setState({
      modalShow: "",
      display: "none",
    })
  }

  componentDidMount() {
    this[this.props.isOpen ? "openModal" : "closeModal"]();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this[this.props.isOpen ? "openModal" : "closeModal"]();
    }
  }

  render() {
    return(
      <div
        className={"modal fade " + this.state.modalShow}
        tabIndex="-1"
        role="dialog"
        style={{ display: this.state.display }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => this.props.toggleModal()}
              ></button>
            </div>
            <div className={Boolean(this.props.errors.name) ? "modal-body form-error" : "modal-body"}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  className="form-control border"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.props.todo.name}
                  onChange={(e) => this.props.changeFn(e)}
                />
                <div className="text-warning mb-3">
                  {this.props.errors.name &&
                    <FontAwesomeIcon icon={faExclamationTriangle} />} {this.props.errors.name}
                </div>
              </div>
              <Calendar 
                name="startDate"
                label="Init date"
                value={this.props.todo.startDate}
                changeFn={(e) => this.props.changeFn(e)}
                error={this.props.errors.startDate}
              />
              <div className="text-warning mb-3">
                {this.props.errors.startDate &&
                  <FontAwesomeIcon icon={faExclamationTriangle} />} {this.props.errors.startDate}
              </div>
              <Calendar 
                name="endDate"
                label="End date"
                value={this.props.todo.endDate}
                changeFn={(e) => this.props.changeFn(e)}
                error={this.props.errors.endDate}
              />
              <div className="text-warning mb-3">
                {this.props.errors.endDate &&
                  <FontAwesomeIcon icon={faExclamationTriangle} />} {this.props.errors.endDate}
              </div>
              <div className="mb-3 col-9">
                <label htmlFor="priority" className="form-label">Priority</label>
                <input
                  className="form-control border"
                  type="range"
                  name="priority"
                  min={1}
                  max={3}
                  step={1}
                  value={this.props.todo.priority}
                  onChange={(e) => this.props.changeFn(e)}
                />
              </div>
              {this.props.categories && <div className="mb-3 col-9">
                <select
                  className="form-select"
                  name="category"
                  value={this.props.todo.category}
                  onChange={(e) => this.props.changeFn(e)}
                >
                  <option value="default">Select a category</option>
                  {this.props.categories.map((cat, index) =>
                    <option key={index} value={cat.id}>{cat.category}</option>)}
                </select>
              </div>}
              <div className="mb-3 col-3 col-sm-8 form-check">
                <input
                  className="form-check-input border"
                  type="checkbox"
                  name="completed"
                  value={this.props.todo.completed}
                  onChange={(e) => this.props.changeFn(e)}
                />
                <label htmlFor="completed" className="form-check-label">Completed</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => this.props.toggleModal()}
              >Close</button>
              <button type="button" className="btn btn-primary" onClick={this.props.submitFn}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}