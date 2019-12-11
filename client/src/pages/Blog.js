// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";

// class Detail extends Component {
//     state = {

//     }
// }

// // Add code to get the bonsai with an _id equal to the id in the route param
// // e.g. http://localhost:3000/bonsais/:id
// // The bonsai id for this route can be accessed using this.props.match.params.id
// componentDidMount() {
//     API.getBlogpost(this.props.match.params.id)
//         .then(res => this.setState({ tree: res.data }))
//         .catch(err => console.log(err));
// }

// render() {
//     return (
//         <Container fluid>
//             <Row>
//                 <Col size="md-12">
//                     <Jumbotron>
//                         <h1>{this.state.blog.name} by {this.state.blog.owner}</h1>
//                     </Jumbotron>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col size="md-10 md-offset-1">
//                     <article>
//                         <h1>Blog Post</h1>
//                         <p>{this.state.blog.description}</p>
//                     </article>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col size="md-2">
//                     <Link to="/">← Back to Bonsai's</Link>
//                 </Col>
//             </Row>
//         </Container>
//     );
// }


// export default Blog;