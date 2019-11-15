// import React from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReactS3 from "react-s3";
// import { keys } from "../../keys";

const config = {
    bucketName: "bonsai-league",
    dirName: 'images', /*Optional*/
    region: 'us-east-1', /*'us-east-2'*/
    accessKeyId: process.env.REACT_APP_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY 
}


class Home extends Component {
    constructor(){
        super();
    }
    upload(e) {
        console.log(e.target.files[0]);
        ReactS3.upload( e.target.files[0] , config)
        .this( (data)=> {
            console.log(data);
        })
        .catch( (err)=> {
            alert(err);
        })
    }
    render(){
        return (
            <div>
                <h3>
                    aws s3 upload
                </h3>
                <input
                type="file"
                onChange={this.upload}
                />
            </div>
        ); 
    }
}


ReactDOM.render(<Home />, document.getElementById("root"));
