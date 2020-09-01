import React from 'react';

interface HeaderProps {
    text: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return(
      <h1>{props.text}</h1>
  )
}

export default Header;