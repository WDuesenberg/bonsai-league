import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    tree: {}
  };
  // Add code to get the bonsai with an _id equal to the id in the route param
  // e.g. http://localhost:3000/bonsais/:id
  // The bonsai id for this route can be accessed using this.props.match.params.id
  componentDidMount() {
    API.getBonsai(this.props.match.params.id)
      .then(res => this.setState({ tree: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>{this.state.tree.name} by {this.state.tree.owner}</h1>
              <img src={'https://bonsai-league.s3.amazonaws.com/' + this.state.tree.imageUrl} alt={this.state.tree.name}/>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 md-offset-1">
            <article>
              <h1 class="description">Description</h1>
              <p>{this.state.tree.description}</p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Bonsai's</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
