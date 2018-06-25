import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/black.css';
import './App.css';
import baiduSearchImage from './baidu_search.png';
import mr from './mr.png';

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
const gaussianLikelihood =
  'P(f=v|C_k) = 1/sqrt(2pisigma_k^2)e^(-(v-mu_k)^2/(2sigma_k^2)';
const priorProba = 'P(C_k) = N_C / N';
const variance = 'sigma_k^2';
const mean = 'mu_k';
const wordModel =
  'hatp(w_i|C_k) = (count(w_i, C_k)) /(sum_(winV)count(w, C_k))';
const smoothing =
  'hatp(w_i|C_k) = (count(w_i, C_k) + alpha) /(sum_(winV)count(w, C_k) + alpha|V|)';
const wordClassifier = 'hat y = argmax P(C_k)prod_(i=0)^N P(w_i|C_k)';
const logClassifier =
  'log(haty) = argmax log(P(C_k)) + sum_(i=0)^N log(P(w_i|C_k))';
const linearClassifier = '= argmax beta_0 + X*W_k^T';
const logLikelihood =
  'log(P(w_i|C_k)) = log(count(w_i, C_k) + alpha) - log(sum_(winV)count(w, C_k) + alpha|V|)';
const ngramModelJoint =
  'P(w_1|w_2, w_3, ..., w_n, C_k)*P(w_2|w_3, ..., w_n, C_k)*...*P(w_n|C_k)*P(C_k)';
const ngramModel = ' = P(w_1|w_2, C_k)*P(w_2|w_3, C_k)*...*P(w_n|C_k)*P(C_k)';
const tf = 'tf(t,d) = log(1 + f_(t,d))';
const idf = 'idf(t,D) = log(|D|/ |{d in D: t in d}| + alpha)';

const accuracyChart = {
  title: { text: 'Model Accuracy' },
  data: {
    columns: [
      ['MNB', 83, 86, 78, 81, 79, 81],
      ['Logistic Regression', 89, 89, 81, 84, 80, 83],
      ['SVM', 88, 91, 80, 82, 79, 82]
    ],
    type: 'bar'
  },
  bar: {
    width: {
      ratio: 0.5
    }
  },
  axis: {
    x: {
      type: 'category',
      categories: [
        'IMDB Review',
        'IMDB Review Bi-gram',
        'Twitter Sentiment',
        'Twitter Sentiment Bi-gram',
        'Overall',
        'Overall Bi-gram'
      ]
    }
  },
  tooltip: {
    show: true,
    format: {
      value: (value, ratio, id) => {
        return value + '%';
      }
    }
  }
};

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
                <li>Naive Bayes</li>
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
              <h3>Naive Bayes Classifier</h3>
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
              <div className="fragment" data-fragment-index="1">
                <div>Joint Probability</div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <div>Probability chain rule</div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb2}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="3">
                <div>Conditional independence assumption</div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{jointProb3}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="4">
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
              <div className="fragment" data-fragment-index="1">
                <div>Maximum likelihood estimation</div>
                <br />
                <div>
                  <MathJax.Context input="ascii">
                    <div>
                      <MathJax.Node>{classifier}</MathJax.Node>
                    </div>
                  </MathJax.Context>
                </div>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                Generative classifier
              </div>
            </section>
          </section>
          <section>
            <header>
              <h3>Gaussian bayes</h3>
            </header>
            <section>
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{gaussianLikelihood}</MathJax.Node>
                  </div>
                </MathJax.Context>
                <br />
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{mean}</MathJax.Node>
                    <span className="demo-description">
                      Mean of the values in feature f associated with a category
                      C
                    </span>
                  </div>
                </MathJax.Context>
                <br />
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{variance}</MathJax.Node>
                    <span className="demo-description">
                      Variance of the values in feature f associated with a
                      category C
                    </span>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{priorProba}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <h4>Normality test</h4>
              <SyntaxHighlighter
                language="python"
                style={monokaiSublime}
                wrapLines={true}
              >
                {`
                  # H0: Sample is not significantly different from normal distribution
                  # H1: Sample is significantly different from normal distribution
                  from scipy import stats
                  _, p = stats.normaltest(x)
                  alpha = 0.001
                  if p < alpha:
                    print("The null hypothesis can be rejected")
                  else:
                    print("The null hypothesis can not be rejected")
                  `}
              </SyntaxHighlighter>
            </section>
          </section>
          <section>
            <header>
              <h3>Multinomial bayes and Sentiment Analysis</h3>
            </header>
            <section>
              <h4>Multinomial Naive Bayes classifier</h4>
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{featureVector}</MathJax.Node>
                    <span className="demo-description">
                      Assume feature is draw from multinomial distribution
                    </span>
                  </div>
                </MathJax.Context>
                <div>
                  In text classification, feature is word occurances in a single
                  document
                </div>
              </div>
            </section>
            <section>
              <MathJax.Context input="ascii">
                <div>
                  <MathJax.Node>{wordModel}</MathJax.Node>
                </div>
              </MathJax.Context>
              <div className="fragment" data-fragment-index="1">
                <br />
                <div>Add Smoothing factor</div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{smoothing}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                Lidstone Smoothing: 0&lt;&alpha;&lt;1
              </div>
              <br />
              <div className="fragment" data-fragment-index="3">
                Laplace Smoothing: &alpha; = 1
              </div>
            </section>
            <section>
              <h4>Classifier in log space</h4>
              <MathJax.Context input="ascii">
                <div>
                  <MathJax.Node>{wordClassifier}</MathJax.Node>
                </div>
              </MathJax.Context>
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{logClassifier}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{linearClassifier}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="3">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{logLikelihood}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <img src={mr} alt="MR Arch" />
              <div>MapReduce Implementation</div>
            </section>
            <section>
              <h4>ngram language model</h4>
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{ngramModelJoint}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <div>Markov assumption</div>
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{ngramModel}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="3">
                <SyntaxHighlighter
                  language="python"
                  style={monokaiSublime}
                  wrapLines={true}
                >
                  {`
                    text = "Lucy eats ice cream"
                    bigram = ["Lucy eats", "eats ice",  "ice cream"]
                    grams = ["Lucy", "eats", "ice", "cream", "Lucy eats", "eats ice",  "ice cream"]
                    `}
                </SyntaxHighlighter>
              </div>
            </section>
            <section>
              <h4>TF-IDF as feature</h4>
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{tf}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii">
                  <div>
                    <MathJax.Node>{idf}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="2" />
              <br />
              <div className="fragment" data-fragment-index="3">
                Alternative is to use stop words, but it's not good for
                Sentiment Analysis
              </div>
            </section>
            <section>
              <h4>Negation</h4>
              <SyntaxHighlighter
                language="python"
                style={monokaiSublime}
                wrapLines={true}
              >
                {`
                  text = "I really don't dislike this cake"
                  negated_grams = ['i', 'really', 'i really', 'do',
                  'really do', "n't", "do n't", 'NOT_dislike', "n't NOT_dislike",
                  'NOT_this', 'NOT_dislike NOT_this', 'NOT_cake', 'NOT_this NOT_cake']
                  `}
              </SyntaxHighlighter>
            </section>
            <section>
              <h4>Implementation with Sklearn</h4>
              <SyntaxHighlighter
                language="python"
                style={monokaiSublime}
                wrapLines={true}
              >
                {`
                # convert array of tokens to tfidf feature
                tfidf_transformer = TfidfTransformer()
                vectorizer = CountVectorizer(min_df=2, tokenizer=tokenizer)
                train_counts = vectorizer.fit_transform(train_content)
                train_tfidf = tfidf_transformer.fit_transform(train_counts)
                # Fit the MNB model
                clf = MultinomialNB().fit(train_tfidf, target)
                # Persist vectorizer and model
                joblib.dump(vectorizer, VECTOR_FILE)
                joblib.dump(tfidf_transformer, IFIDF_FILE)
                joblib.dump(clf, MODEL_FILE)
                # Predict
                countVector = vectorizer.transform([text])
                tf_idf = tfidf_transformer.transform(countVector)
                proba = clf.predict_proba(tf_idf)
                `}
              </SyntaxHighlighter>
              <div>
                <a href="https://github.com/ruiyangio/text-analytics">
                  Code on Github
                </a>
              </div>
            </section>
            <section>
              <SyntaxHighlighter
                language="python"
                style={monokaiSublime}
                wrapLines={true}
              >
                {`
                    x = [
                        [1,2,3,4],
                        [5,6,7,8],
                        [2,3,4,4]
                    ]
                    y = [1,0,1]
                    y = binary_transform(y)
                    # [[0. 1.]
                    #  [1. 0.]
                    #  [0. 1.]]
                    feature_count = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                    class_count = [0, 0]
                    feature_count += y.T * x
                    #  [[5. 6. 7. 8.]
                    #  [3. 5. 7. 8.]]
                    class_count += y.sum(axis=0) # sum along column
                    # [1. 2.]
                    smoothed_feature_count = feature_count + 1
                    smoothed_class_count = smoothed_feature_count.sum(axis=1) # sum along row
                    # [[6. 7. 8. 9.]
                    #  [4. 6. 8. 9.]]
                    # [30. 27.]
                    feature_log_prob_ = log(smoothed_feature_count)-log(smoothed_class_count)
                    # [[-1.60943791 -1.45528723 -1.32175584 -1.2039728 ]
                    #  [-1.9095425  -1.5040774  -1.21639532 -1.09861229]]
                    class_log_prior = log(class_count)-log(class_count.sum())
                    # [-1.09861229 -0.40546511]
                    new_case = [2,3,4,5]
                    log_prob = new_case * feature_log_prob_.T + class_log_prior
                    # [-19.99023719 -19.09542505]
                    `}
              </SyntaxHighlighter>
            </section>
          </section>
          <section>
            <header>
              <h3>Results</h3>
              <div className="demo-chart">
                <C3Chart
                  title={accuracyChart.title}
                  data={accuracyChart.data}
                  bar={accuracyChart.bar}
                  axis={accuracyChart.axis}
                  tooltip={accuracyChart.tooltip}
                />
              </div>
              <div>
                <table className="demo-table">
                  <tbody>
                    <tr>
                      <th>Data set</th>
                      <th>Cases</th>
                      <th>MNB</th>
                      <th>MNB-Bigram</th>
                      <th>Logistic</th>
                      <th>Logistic-Bigram</th>
                      <th>SVM</th>
                      <th>SVM-Bigram</th>
                    </tr>
                    <tr>
                      <td>IMDB</td>
                      <td>50k reviews</td>
                      <td>83%</td>
                      <td>86%</td>
                      <td>89%</td>
                      <td>89%</td>
                      <td>88%</td>
                      <td>91%</td>
                    </tr>
                    <tr>
                      <td>Twitter Sentiment</td>
                      <td>160k tweets</td>
                      <td>78%</td>
                      <td>81%</td>
                      <td>81%</td>
                      <td>84%</td>
                      <td>80%</td>
                      <td>82%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </header>
          </section>
          <section
            data-background-iframe="http://elincia.westus2.cloudapp.azure.com/ml/graphql"
            data-background-interactive
          />
        </div>
      </div>
    );
  }
}

export default App;
