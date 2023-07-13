import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import "./stars.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
    this.onPortfolioChange = this.onPortfolioChange.bind(this);
  };

  onPortfolioChange(checked) {
    this.setState({checked});
    this.setPortfolio();
  };

  setPortfolio()  {
    this.props.applyPickedLanguage();
  };

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      var networks = this.props.sharedData.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class}></i>
            </a>
          </span>
          );
        });
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight, display: 'block' }}>
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <div className="row aligner" style={{height: '80%'}}>
          <div className="col-md-12">
            <div>
              <img
                height="200px"
                src="images/transparent_profile.png"
                alt="transparent_avatar"
              />
              <br/>
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <div className="social-links-frontpage">{networks}</div>
            </div>
          </div>
        </div>
        <div className="portfolio-switch-container">
          <h2 className="portfolio-switch-text">
            Portfolio Switch
          </h2>
          <Switch
            checked={this.state.checked}
            onChange={this.onPortfolioChange}
            offColor="#E4E6C3"
            onColor="#C1666B"
            className="react-switch mx-auto"
            width={125}
            height={60}
            uncheckedIcon={
              <span
                className="iconify"
                data-icon="solar:programming-bold"
                data-inline="false"
                style={{
                  display: "block",
                  height: "100%",
                  fontSize: 40,
                  textAlign: "end",
                  marginLeft: "10px",
                  color: "#000000",
                }}
              ></span>
            }
            checkedIcon={
              <span
                className="iconify"
                data-icon="icon-park-solid:video"
                data-inline="false"
                style={{
                  display: "block",
                  height: "100%",
                  fontSize: 40,
                  textAlign: "end",
                  marginLeft: "13px",
                  color: "#000000",
                }}
              ></span>
            }
            id="icon-switch"
          />
        </div>
      </header>
    );
  }
}

export default Header;
