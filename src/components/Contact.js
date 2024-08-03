import React, { Component } from "react";
import Typical from "react-typical";

class Contact extends Component {
  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
          <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }

    return(
      <section id="contact" style={{display: 'block'}}>
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>Contact Me</span>
          </h1>
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="contact-meet">
                <span className="contact-meet-span" style={{ cursor: "auto", display: "grid", width: 309, align_items: "center"}}>
                  <div style={{display: "inline"}}>
                    <img
                      height="100px"
                      src="website-icon.svg"
                      alt="Avatar placeholder"
                      style={{float: "left"}}
                      className="contact-meet-image"
                    />
                    <div className="contact-meet-text">
                      <br />
                      <h2>Hi, I am</h2>
                      <h1>
                        Tsay Yong.
                      </h1>
                      <h2>Nice to meet you!</h2>
                    </div>
                  </div>
                  <div>
                    <hr className="contact-meet-line"/>
                  </div>
                  <div className="contact-meet-details">
                    <h4>If you wish to connect, discuss a project collaboration, or simply say hello, I'm eager to receive your message. Either send me a message on LinkedIn (by connecting) or send me an email!</h4>
                    <br />
                    <h4>Email: padricneo@gmail.com</h4>
                    <div className="social-links-frontpage" style={{display:"inline"}}>{networks}</div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-color" style={{height: 1}}/>
      </section>
    )
  }
}

export default Contact
