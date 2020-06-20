import React from "react";

type Props = {
  name: string;
};

class User extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return <div>Юзер {name}</div>;
  }
}

export default User;
