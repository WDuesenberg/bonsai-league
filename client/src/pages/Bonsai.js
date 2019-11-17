import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import S3FileUpload from "react-s3/lib/ReactS3";

const config = {
  bucketName: "bonsai-league",
  // dirName: 'photos', /*Optional*/
  region: 'us-east-1', /*'us-east-2'*/
  accessKeyId: process.env.REACT_APP_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
}

 
class Bonsai extends Component {
  state = {
    trees: [],
    name: "",
    species: "",
    owner: "",
    location: "",
    description:""
  };
  upload=(e) =>{
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    S3FileUpload.uploadFile(file, config)
        .then(data => console.log(data))
        .catch(err => console.log(err))

}

  componentDidMount() {
    this.loadBonsai();
  }

  loadBonsai = () => {
    API.getBonsai()
      .then(res =>
        this.setState({ trees: [...this.state.trees,res.data], name: "", species: "", owner: "", location: "", description: "", })
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
    if (this.state.name && this.state.species) {
      API.saveBonsai({
        name: this.state.name,
        species: this.state.species,
        owner: this.state.owner,
        location: this.state.location,
        description: this.state.description
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
            <h3>
                    Bonsai Image Upload
                </h3>
                <input
                    type="file"
                    onChange={this.upload}
                />
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="Name"
                placeholder="Name (required)"
              />
              <Input
                value={this.state.species}
                onChange={this.handleInputChange}
                name="Species"
                placeholder="Species (required)"
              />
              <Input
                value={this.state.owner}
                onChange={this.handleInputChange}
                name="Owner"
                placeholder="Owner (Optional)"
              />
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="Location"
                placeholder="Location (Optional)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="Description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.species && this.state.name)}
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
                        {bonsai.name} by {bonsai.species}
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
