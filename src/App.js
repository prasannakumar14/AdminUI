import { Component } from "react";
import "./App.css";
import EntriesList from "./EntriesList";

const apiUrl =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

class App extends Component {
  state = {
    entrieslist: [],
    show: "",
    value: "",
    Name: "",
    Email: "",
    Role: "",
  };

  //This function calls the API function
  componentDidMount() {
    this.getEntriesList();
  }

  //This is API function
  getEntriesList = async () => {
    const response = await fetch(`${apiUrl}`);
    if (response.ok === true) {
      const fetchedData = await response.json();
      this.setState({ entrieslist: fetchedData });
    }
  };

  //This function updates the Search Input Field values in state
  onChangeInputField = (event) => {
    this.setState({ value: event.target.value });
  };

  //This function updates the Edit values in state
  onEditEntrie = (Id, Name, Email, Role) => {
    this.setState({ show: Id, Name, Email, Role });
  };

  //This function Updates the EntriesList after deleting the Entries
  onDeleteEntrie = (ID) => {
    const { entrieslist } = this.state;
    const deletedEntries = entrieslist.filter((each) => each.id !== ID);
    this.setState({ entrieslist: deletedEntries });
  };

  //This function updates the Name value in state
  getChangeName = (values) => {
    this.setState({ Name: values });
  };

  //This function updates the Email value in state
  getChangeEmail = (values) => {
    this.setState({ Email: values });
  };

  //This function updates the Role value in state
  getChangeRole = (values) => {
    this.setState({ Role: values });
  };

  //This function updates values are changed to Entries
  submitButton = (getId) => {
    const { Name, Email, Role } = this.state;
    this.setState((prevState) => ({
      entrieslist: prevState.entrieslist.map((update) => {
        if (update.id === getId) {
          return { ...update, name: Name, email: Email, role: Role };
        }
        return update;
      }),
    }));
    this.setState({ show: "" });
  };

  //This function closes the Edit UI to normal UI
  CloseButton = () => {
    this.setState({ show: "" });
  };

  renderEntriesList = () => {
    const { entrieslist, check, value, show, Name, Email, Role } = this.state;

    //This below code filters what we type in the search bar
    const filteredEntries = entrieslist.filter(
      (everyFilter) =>
        everyFilter.name.toLowerCase().includes(value.toLowerCase()) ||
        everyFilter.email.toLowerCase().includes(value.toLowerCase()) ||
        everyFilter.role.toLowerCase().includes(value.toLowerCase())
    );

    return (
      <ul className="unorder-list">
        {filteredEntries.map((eachEntrie) => (
          //calling the EntriesList
          <EntriesList
            key={eachEntrie.id}
            entrieDetails={eachEntrie}
            onDeleteEntrie={this.onDeleteEntrie}
            onEditEntrie={this.onEditEntrie}
            check={check}
            show={show}
            CloseButton={this.CloseButton}
            Name={Name}
            Email={Email}
            Role={Role}
            getChangeName={this.getChangeName}
            getChangeEmail={this.getChangeEmail}
            getChangeRole={this.getChangeRole}
            submitButton={this.submitButton}
          />
        ))}
      </ul>
    );
  };

  render() {
    const { value } = this.state;
    return (
      <div className="admin-container">
        <input
          type="input"
          placeholder="Search by name, email or role"
          className="search-field"
          onChange={this.onChangeInputField}
          value={value}
        />
        <div className="entries-container">
          <input
            type="checkbox"
            className="checkbox"
            onChange={this.onChangeCheckBox}
          />
          <div className="entries-names-container">
            <div className="box">
              <p className="entries-column-name">Name</p>
            </div>
            <div className="box">
              <p className="entries-column-name">Email</p>
            </div>
            <div className="box">
              <p className="entries-column-name">Role</p>
            </div>
            <div className="box">
              <p className="entries-column-name">Action</p>
            </div>
          </div>
        </div>
        {this.renderEntriesList()}
      </div>
    );
  }
}

export default App;
