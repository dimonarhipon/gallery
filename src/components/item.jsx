import React from "react";

export class Item extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div
        key={data.id}
        style={{
          border: "1px solid black",
          marginBottom: "10px",
          padding: "5px"
        }}
      >
        {data.thumbnail !== "self" ? <img src={data.thumbnail} alt="" /> : null}
        <p>{data.title}</p>
        <p>Number of comment: {data.num_comments}</p>
        <a
          href={`https://www.reddit.com/${data.permalink}`}
          target="_blank"
          rel="noonpener noreferrer"
        >
          link
        </a>
      </div>
    );
  }
}
