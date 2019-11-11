import React from "react";
import Particles from "react-particles-js";

import Navigation from "./components/navigation/navigation.component";
import Logo from "./components/logo/logo.component";
import ImageUrlForm from "./components/image-url-form/image-url-form.component";
import Rank from "./components/rank/rank.component";
import FaceRecognition from "./components/face-recognition/face-recognition.component";
import SignIn from "./pages/sign-in/sign-in.component";
import Register from "./pages/register/register.component";

import "./App.css";

const particleOptions = {
  particles: {
    number: {
      values: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: null
    };
  }

  onChangeUser = user => {
    this.setState({user, imageUrl: ''});
  }

  onInputChange = event => {
    this.setState({ imageUrl: event.target.value, box: {} });
  };

  calculateFaceDetection = data => {
    const boxRegions = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: boxRegions.left_col * width,
      topRow: boxRegions.top_row * height,
      rightCol: width - boxRegions.right_col * width,
      bottomRow: height - boxRegions.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box });
  };

  onButtonSubmit = () => {
    const {imageUrl} = this.state;

    fetch('https://secret-dawn-61370.herokuapp.com/clarifai', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({imageUrl})
    })
    .then(res => res.json())
    .then(data => this.displayFaceBox(this.calculateFaceDetection(data)))
    .catch(err => console.log(err));
      
    fetch('https://secret-dawn-61370.herokuapp.com/image', {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.state.user.id})
    })
    .then(res => res.json())
    .then(user => this.setState({user}))
    .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false, user: null });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl, user } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "signin" ? (
          <SignIn onChangeUser={this.onChangeUser} onRouteChange={this.onRouteChange} />
        ) : route === "home" ? (
          <div>
            <Logo />
            <Rank user={user} />
            <ImageUrlForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imgUrl={imageUrl} />
          </div>
        ) : (
          <Register onChangeUser={this.onChangeUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
