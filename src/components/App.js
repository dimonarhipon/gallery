import React from "react";
import "./styles.css";
import { Item } from "./item";

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false
    };
  }
  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({
      isLoading: true,
      enableAutoRefresh: !this.state.enableAutoRefresh
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.data.children,
          isLoading: false
        });
      });
  };

  updateAutoRefresh = () => {
    this.setState(
      state => ({
        enableAutoRefresh: !state.enableAutoRefresh
      }),
      () => {
        if (this.state.enableAutoRefresh) {
          this.autoRefresh = setInterval(this.getItems, 3000);
        } else {
          clearInterval(this.autoRefresh);
        }
      }
    );
  };

  render() {
    const { items, isLoading, enableAutoRefresh } = this.state;
    const itemsSortByComments = items.sort(
      (a, b) => b.data.num_comments - a.data.num_comments
    );
    return (
      <div className="App">
        <h1>Top comment</h1>
        <button
          onClick={this.updateAutoRefresh}
          type="button"
          style={{ marginBottom: "15px" }}
        >
          {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
        </button>
        {isLoading ? (
          <p>..Loading</p>
        ) : (
          itemsSortByComments.map(item => (
            <Item key={item.data.id} data={item.data} />
          ))
        )}
      </div>
    );
  }
}
