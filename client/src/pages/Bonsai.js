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
    owner: "",
    species: "",
    location: "",
    description:"",
    imageUrl: ""
  };
  upload=(e) =>{
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    console.log(file.name)
    S3FileUpload.uploadFile(file, config)
        .then(data => this.setState({imageUrl: file.name}))
        .catch(err => console.log(err))

}

  componentDidMount() {
    this.loadBonsai();
  }

  loadBonsai = () => {
    API.getBonsais()
      .then(res =>{
        if (res.data){
          this.setState({ trees: res.data})
          // this.setState({ trees: res.data, name: "", species: "", owner: "", location: "", description: "", imageUrl: "" })
        }
        console.log(this.state.trees)
      })
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
    console.log(this.state[name])
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.name)
    if (this.state.name && this.state.species) {
      console.log("submit button")
      API.saveBonsai({
        name: this.state.name,
        owner: this.state.owner,
        species: this.state.species,
        location: this.state.location,
        description: this.state.description,
        imageUrl: this.state.imageUrl
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
              <h1>Add your bonsai tree</h1>
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
                // value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"
              />
              <Input
                // value={this.state.species}
                onChange={this.handleInputChange}
                name="owner"
                placeholder="Owner (required)"
              />
              <Input
                // value={this.state.owner}
                onChange={this.handleInputChange}
                name="species"
                placeholder="Species (required)"
              />
              <Input
                // value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (optional)"
              />
              <TextArea
                // value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (optional)"
              />
              <FormBtn
                // disabled={!(this.state.species && this.state.name)}
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
                  bonsai ? (
                  <ListItem key={bonsai._id}>
                    <Link to={"/bonsais/" + bonsai._id}>
                      <strong>
                        {bonsai.name} by {bonsai.owner}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBonsai(bonsai._id)} />
                  </ListItem>
                ):(
                  <h3>No Trees Found</h3>
                )
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
