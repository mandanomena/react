import React from 'react';
import Acceuil from './Acceuil';
import Fruits from './Fruits';

function App() {
  return (
    <div>
      <nav>
        <CustomLink href="/" label="Acceuil" />
        <CustomLink href="/fruits" label="Fruits" />
      </nav>
      <div>
        <Content />
      </div>
    </div>
  );
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: window.location.pathname };
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState = () => {
    this.setState({ currentPage: window.location.pathname });
  };

  render() {
    const { currentPage } = this.state;
    if (currentPage === '/fruits') {
      return <Fruits />;
    } else {
      return <Acceuil />;
    }
  }
}

const CustomLink = ({ href, label }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <a href={href} onClick={handleClick}>
      {label}
    </a>
  );
};

export default App;


