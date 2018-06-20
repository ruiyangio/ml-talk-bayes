import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/moon.css';
import './App.css';

const bayesTherom = 'P(A|B) = (P(B|A) * P(A))/(P(B))';
const featureVector = 'F = (f_1, f_2, ..., f_n)';
const featureBayes =
  'obrace(P(C_k|F))^("posterior") = (obrace(P(F|C_k))^("likelihood") * obrace(P(C_k))^("prior"))/(ubrace(P(F))_("marginal likelihood"))';

class App extends Component {
  componentDidMount() {
    Reveal.initialize({
      width: '100%',
      height: '100%'
    });
  }

  render() {
    return (
      <div className="demo reveal">
        <div className="slides">
          <section>
            <header>
              <h2>Learning session: Naive Bayes</h2>
            </header>
            <div>
              <MathJax.Context input="ascii">
                <div>
                  <MathJax.Node>{bayesTherom}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </section>
          <section>
            <header>
              <h3>Baidu Search Query Classification</h3>
            </header>
            <section>
              <div>尼桑leaf的最新价格 -> Car -> Electric car</div>
              <div>新版本炉石 红龙还好用不 -> Game -> Mobile game</div>
            </section>
          </section>
          <section>
            <header>
              <h3>Bayes Therom and Probabilistic model</h3>
            </header>
            <section>
              <div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{featureVector}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{featureBayes}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
          </section>
          <section>
            <header>
              <h3>Three mostly used models</h3>
            </header>
            <section>Gaussian bayes</section>
            <section>Multinomial bayes</section>
            <section>Binomial bayes</section>
          </section>
          <section>
            <header>
              <h3>Sentiment Analysis</h3>
            </header>
          </section>
          <section
            data-background-iframe="http://elincia.westus2.cloudapp.azure.com/graphql"
            data-background-interactive
          />
          <section>
            <header>
              <h3>Evaluation</h3>
            </header>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
