import React, { Component } from 'react'

export default class Slider extends Component {
  render() {
    return (
<div ks-component="base.container" className="l-container l-container--section">
  <div className="l-section l-section--space-before-none l-section--space-after-none">
    <div className="l-section__container l-section__container--full">
      <div ks-component="base.container" className="l-container l-container--storytelling">
        <div className="c-storytelling c-storytelling--order-desktop-image-last c-storytelling--full">
          <div className="c-storytelling__image">
            <img alt className="lazyload" data-src="img/recipes/hero-angled.png" />
            <noscript>
              &lt;img alt="" src="img/recipes/hero-angled.png" /&gt;
            </noscript>
          </div>
          <div className="c-storytelling__box">
            <div className="c-storytelling__box__content">
              <div ks-component="base.container" className="l-container l-container--headline">
                <header className="c-headline c-headline--align-left c-headline--space-after-small">
                  <h1 className="c-headline__headline">
                    We help you overcome digital obstacles
                  </h1>
                  <p className="c-headline__subheadline">
                    Autem voluptas quis facere et qui
                    voluptate earum.
                  </p>
                </header>
              </div>
              <div ks-component="base.container" className="l-container l-container--rich-text">
                <div className="c-rich-text c-storytelling__text">
                  <p>
                    Lorem ipsum dolor sit amet,
                    <a href="http://example.com/">
                      consetetur sadipscing
                    </a>
                    elitr, sed diam voluptua. At vero eos et
                    accusam et justo duo
                    <strong>dolores et ea rebum.</strong>
                  </p>
                </div>
              </div>
              <div className="c-storytelling__action">
                <span className="c-button--wrapper">
                  <a href="#" className="c-button c-button--solid">
                    <span className="c-button__content">
                      <span>Start now</span>
                      <span className="c-button__border" />
                    </span>
                  </a>
                </span>
                <span className="c-button--wrapper">
                  <a href="#" className="c-button c-button--outline">
                    <span className="c-button__content">
                      <span>Request a demo</span>
                      <span className="c-button__border" />
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
  }
}
