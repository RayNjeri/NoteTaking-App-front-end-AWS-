import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { invokeApig, s3Upload } from "../libs/awsLib";
import config from "../config";
import "./NewNote.css";

export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const results = await this.notes();
      this.setState({ notes: results });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  notes() {
    return invokeApig({ path: "/notes" });

  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      return;
    }
    this.setState({ isLoading: true });

    try {
      const uploadedFilename = this.file
        ? (await s3Upload(this.file)).Location
        : null;
      
      await this.createNote({
        content: this.state.content,
        attachment: uploadedFilename
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }

    
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <ListGroupItem
            key={note.noteId}
            href={`/notes/${note.noteId}`}
            onClick={this.handleNoteClick}
            header={note.content.trim().split("\n")[0]}
          >
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
          : <ListGroupItem
            key="new"
            href="/notes/new"
            onClick={this.handleNoteClick}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
              </h4>
          </ListGroupItem>
    );
  }
  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
}