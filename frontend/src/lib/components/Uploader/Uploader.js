import React, {Component} from 'react';
import axios from 'axios';
import {md5} from "../../../utils/hash/hash";
import {ThemeProvider} from '@material-ui/styles'
import {MainTheme} from "../../themes/MainTheme";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            url: ""
        }
        this.onLoaded = props.onLoaded
    }

    handleChange = (ev) => {
        this.setState({success: false, url: ""});

    }
    // Perform the upload
    handleUpload = (ev) => {
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        axios.post("http://images.sharemyride.ru/api/sign_s3", {
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
                <label htmlFor={'input-elem'} className={'MuiButton-root MuiButton-contained'}>Выбрать фото</label>
                <input style={{display: 'none'}} id={'input-elem'} onChange={this.handleChange} ref={(ref) => {
                    this.uploadInput = ref;
                }} type="file" accept="image/*" multiple/>
                <button className={'MuiButton-root MuiButton-contained'} onClick={this.handleUpload}>Загрузить</button>
            </ThemeProvider>
        );
    }
}

export default App;
