import "./App.css";
import { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = "http://localhost:5038/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    fetch(this.API_URL + "api/notes/GetNotes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ notes: data });
      });
  }

  async addClick() {
    var newNotes = document.getElementById("newNotes").value;
    const data = new FormData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/notes/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  async deleteClick(id) {
    console.log(id);
    fetch(this.API_URL + "api/notes/DeleteNotes?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="App">
        <h2>Заметки</h2>
        <input id="newNotes" />
        &nbsp;
        <button onClick={() => this.addClick()}>Добавить заметку</button>
        {notes.map((note) => (
          <p>
            <b>{note.description}</b>&nbsp;
            <button onClick={() => this.deleteClick(note.id)}>
              Удалить заметку
            </button>
          </p>
        ))}
      </div>
    );
  }
}
export default App;
