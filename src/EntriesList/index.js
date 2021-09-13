import { BiTrashAlt, BiEdit } from "react-icons/bi";
import "./index.css";

const EntriesList = (props) => {
  const {
    entrieDetails,
    onDeleteEntrie,
    onEditEntrie,
    show,
    CloseButton,
    submitButton,
    Name,
    Email,
    Role,
    getChangeName,
    getChangeEmail,
    getChangeRole,
  } = props;
  const { id, name, email, role } = entrieDetails;

  //This function is for Edit Button
  const onClickEditIcon = () => {
    onEditEntrie(id, name, email, role);
  };

  //This function is for Delete Button
  const onClickTrashIcon = () => {
    onDeleteEntrie(id);
  };

  //This function is for update Name in state
  const changeName = (event) => {
    getChangeName(event.target.value);
  };

  //This function is for update Email in state
  const changeEmail = (event) => {
    getChangeEmail(event.target.value);
  };

  //This function is for update Role in state
  const changeRole = (event) => {
    getChangeRole(event.target.value);
  };

  //This function is for Submitting updated values
  const onSubmitButton = () => {
    submitButton(id);
  };

  //This function is for Close the Edit UI
  const onCloseButton = () => {
    CloseButton();
  };

  const onChangeEntrieValues = () => {
    if (show === id) {
      //This below code returns if any entrie is on Edit Mode
      return (
        <div className="entries-list-container">
          <input type="checkbox" className="checkbox" />
          <div className="entries-names-container1">
            <div className="box2">
              <input
                type="input"
                value={Name}
                className="input-field"
                onChange={changeName}
              />
            </div>
            <div className="box2">
              <input
                type="text"
                value={Email}
                className="input-field"
                onChange={changeEmail}
              />
            </div>
            <div className="box2">
              <input
                type="text"
                value={Role}
                className="input-field"
                onChange={changeRole}
              />
            </div>
            <div>
              <button
                type="button"
                className="change-button"
                onClick={onSubmitButton}
              >
                Submit
              </button>
              <button
                type="button"
                className="change-button"
                onClick={onCloseButton}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
    //This below code returns the normal Entries list
    return (
      <div className="entries-list-container">
        <input type="checkbox" className="checkbox" />
        <div className="entries-names-container1">
          <div className="box">
            <p className="entries">{name}</p>
          </div>
          <div className="box">
            <p className="entries">{email}</p>
          </div>
          <div className="box">
            <p className="entries">{role}</p>
          </div>
          <div className="box1">
            <button
              type="button"
              onClick={onClickEditIcon}
              className="button-icon"
            >
              <BiEdit className="trash-icons" />
            </button>
            <button
              type="button"
              onClick={onClickTrashIcon}
              className="button-icon"
            >
              <BiTrashAlt className="trash-icons" color="red" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  //This code calls the above Function
  return <li class="list-items">{onChangeEntrieValues()}</li>;
};

export default EntriesList;
