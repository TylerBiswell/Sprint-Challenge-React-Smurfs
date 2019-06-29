import React from "react";
import axios from "axios";

class Smurf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smurf: {
        name: "",
        heigh: "",
        age: "",
        id: ""
      }
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        return res.data.find(smurf => `${smurf.id}` === id);
      })
      .then(smurf => {
        this.setState(() => ({
          smurf: {
            name: smurf.name,
            height: smurf.height,
            age: smurf.age,
            id: smurf.id
          }
        }));
      })
      .catch(error => console.log(error));
  }
  
  deleteSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    axios
      .delete(`http://localhost:3333/smurfs/${this.state.smurf.id}`)
      .then(res => {
        this.props.deleteSmurf(this.props.history);
      })
      .catch(err => console.log(err));

    this.setState({
      smurf: { name: "", age: "", height: "" }
    });
  };

  render() {
    return (
      <div className="smurf">
        <h3>{this.state.smurf.name}</h3>
        <strong>{this.state.smurf.height} tall</strong>
        <p>{this.state.smurf.age} smurf years old</p>
        <form onSubmit={this.deleteSmurf}>
          <button
            className="smurf-button"
            type="submit"
            onClick={this.deleteSmurf}
          >
            Delete from village
          </button>
        </form>
      </div>
    );
  }
}


Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;

