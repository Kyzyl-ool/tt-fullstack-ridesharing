import React, {Component} from 'react';
import axios from 'axios';
import {md5} from "../../../utils/hash/hash";
import {ThemeProvider} from '@material-ui/styles'
import {MainTheme} from "../../themes/MainTheme";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";


class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            url: ""
        }
        this.onLoaded = props.onLoaded
        this.loaded = false
    }

    handleChange = (ev) => {
        this.setState({success: false, url: ""});
        if (this.uploadInput.files[0]) {
            this.loaded = true;
        }
    }
    // Perform the upload
    handleUpload = (ev) => {
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        axios.post("https://images.sharemyride.ru/api/sign_s3", {
            fileName: md5(fileName),
            fileType: fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                this.setState({url: url})
                this.onLoaded(url)
                console.log("Recieved a signed request " + signedRequest);

                // Put the fileType in the headers for the upload
                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest, file, options)
                    .then(result => {
                        console.log("Response from s3")
                        this.setState({success: true});
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }


    render() {
        return (
            <ThemeProvider theme={MainTheme}>
                <Box m={1} ><Button variant={"outlined"} disabled={this.loaded}> <label htmlFor={'input-elem'}> {this.loaded ? 'Фото выбрано' : 'Выбрать фото'}</label> </Button> </Box>
                <input style={{display: 'none'}} id={'input-elem'} onChange={this.handleChange} ref={(ref) => {
                    this.uploadInput = ref;
                }} type="file" accept="image/*" multiple/>
                <Box m={1}><Button disabled={!this.loaded} onClick={this.handleUpload}>Загрузить</Button></Box>
            </ThemeProvider>
        );
    }
}

export default Uploader;
