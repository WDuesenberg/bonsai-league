import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Bonsai extends Component {
  state = {
    trees: [],
    name: "",
    species: "",
    owner: "",
    description:"",
    location: ""
  };

  componentDidMount() {
    this.loadBonsai();
  }

  loadBonsai = () => {
    API.getBonsai()
      .then(res =>
        this.setState({ trees: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBonsai = id => {
    API.deleteBonsai(id)
      .then(res => this.loadBonsai())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBonsai({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBonsai())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Bonsai Should I See?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Bonsai!
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Bonsai's On My List</h1>
            </Jumbotron>
            {this.state.trees.length ? (
              <List>
                {this.state.trees.map(bonsai => (
                  <ListItem key={bonsai._id}>
                    <Link to={"/bonsais/" + bonsai._id}>
                      <strong>
                        {bonsai.title} by {bonsai.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBonsai(bonsai._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Bonsai;
