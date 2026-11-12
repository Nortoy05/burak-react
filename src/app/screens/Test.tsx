import React from "react";

interface TestProps {}

interface TestState {
  brand: string;
  model: string;
  color: string;
  year: number;
}

class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({ color: "blue", brand: "Tesla", model: "Model 5", year: 2025 });
  };

  componentDidMount() {
      console.log("componentDidMount");
      // runs after first render => RETRIEVE DATA FROM BACKEND SERVER
  }

  componentWillUnmount() {
      console.log("componentWillUnmount");
      // runs before component unmount
  }

  componentDidUpdate() {
      console.log("componentDidUpdate");
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model} from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;