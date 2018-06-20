import React, { Component } from 'react';
import Reveal from 'reveal.js';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/moon.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    Reveal.initialize();
  }

  render() {
    return (
      <div className="demo reveal">
        <div className="slides">
          <section>
            <header className="main-header">S1 Title</header>
            <div className="slide-body">S1</div>
          </section>
          <section>S2</section>
          <section>S3</section>
        </div>
      </div>
    );
  }
}

export default App;
