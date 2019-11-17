// import React from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ReactS3 from "react-s3";
import S3FileUpload from "react-s3/lib/ReactS3";


const config = {
    bucketName: "bonsai-league",
    // dirName: 'photos', /*Optional*/
    region: 'us-east-1', /*'us-east-2'*/
    accessKeyId: process.env.REACT_APP_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
}


class Home extends Component {
    constructor() {
        super();
    }

    upload(e) {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        S3FileUpload.uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }
    render() {
        return (
            <div>
            <App />
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

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(<Home />, document.getElementById("root"));
