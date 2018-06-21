import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/black.css';
import './App.css';
import baiduSearchImage from './baidu_search.png';

const bayesTherom = 'P(A|B) = (P(B|A) * P(A))/(P(B))';
const featureVector = 'F = (f_1, f_2, ..., f_n)';
const targetVector = 'C = (C_1, C_2, ..., C_k)';
const featureBayes =
  'obrace(P(C_k|F))^("posterior") = (obrace(P(F|C_k))^("likelihood") * obrace(P(C_k))^("prior"))/(ubrace(P(F))_("marginal likelihood"))';
const jointProb = 'P(F|C_k)*P(C_k) = P(f_1, f_2, f_3, ..., f_n, C_k)';
const jointProb2 =
  ' = P(f_1|f_2, f_3, ..., f_n, C_k)*P(f_2|f_3, ..., f_n, C_k)*...*P(f_n|C_k)*P(C_k)';
const jointProb3 = ' = P(f_1|C_k)*P(f_2|C_k)*...*P(f_n|C_k)*P(C_k)';
const jointProb4 = '= P(C_k)prod_(i=0)^N P(f_i|C_k)';
const classifier =
  'hat y = argmax P(C_k)prod_(i=0)^N P(f_i|C_k), k in {1, ..., K}';

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
              <h1>Learning session: Naive Bayes</h1>
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
              <h3>Search Query Classification</h3>
            </header>
            <section>
              <div>
                <img src={baiduSearchImage} alt="Baidu Search" />
              </div>
              <div>尼桑leaf的最新价格 &#10132; Car &#10132; Electric car</div>
              <div>
                新版本炉石 红龙还好用不 &#10132; Game &#10132; Mobile game
              </div>
              <br />
              <div>Training data is labeled</div>
              <div>尼桑leaf的最新价格 | car</div>
            </section>
            <section>
              <div>Supervised learning</div>
              <ul>
                <li>Logistic Regression</li>
                <li>Support Vector Machine</li>
                <li>Neural Network that uses Backpropagation</li>
              </ul>
              <br />
              <br />
              <div>Unsupervised learning</div>
              <ul>
                <li>K Means</li>
                <li>Self Organizing Map Neural Network</li>
              </ul>
            </section>
          </section>
          <section>
            <header>
              <h3>Bayes Therom and Classifier</h3>
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
                    <MathJax.Node>{targetVector}</MathJax.Node>
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
            <section>
              <div class="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div class="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb2}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div class="fragment" data-fragment-index="3">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb3}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div class="fragment" data-fragment-index="4">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb4}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <header>
                <h4>Classifier</h4>
              </header>
              <div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{classifier}</MathJax.Node>
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
