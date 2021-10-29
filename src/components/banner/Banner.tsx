import React from "react";

interface BannerProps {
  text?: string;
}

export default class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <div>{ this.props.text }</div>
    );
  }
}