import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particle from './Particle';
// import Clarifai from 'clarifai';

// const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key fbb6a809a1ec4a249d33f5a57055c7e6");


// const app = new Clarifai.App({
//   apiKey: 'fbb6a809a1ec4a249d33f5a57055c7e6'
// })

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {

    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
    console.log(data.name, "here", this.state.user);
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
    // console.log(box);
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    // console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)

    }

  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });

  }

  onEnter = (event) => {

    if (event.which === 13) {
      this.onSubmit();
    }
  }

  onSubmit = () => {
    console.log("hello")
    this.setState({ imageUrl: this.state.input })


    // app.models.predict({
    //   id: "a403429f2ddf4b49b307e318f00e528b",
    //   version: "34ce21a40cc24b6b96ffee54aabff139",
    // }, this.state.input)

    fetch('https://smart-brain-orlf.onrender.com/imageurl', {

      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input

      })
    })
      .then(resp => resp.json())

      .then(response => {

        if (response) {
          fetch('https://smart-brain-orlf.onrender.com/image', {

            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id

            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(error => console.log(error))

          this.displayFaceBox(this.calculateFaceLocation(response))
        }
      })

      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    else {
      this.setState({ isSignedIn: false })
    }
    this.setState({ route: route })

  }

  render() {

    const { isSignedIn, box, route, imageUrl } = this.state;

    return (
      <div className="App">

        <Particle />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {(route === 'home')
          ? <div><Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} onEnter={this.onEnter} />
            <FaceRecognition box={box} image={imageUrl} />
          </div>
          : (route === 'signin')
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }

      </div>
    );

  }

}

export default App;
