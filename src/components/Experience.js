import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Badge from "react-bootstrap/Badge";

class Experience extends Component {
  render() {
    if (this.props.resumeExperience && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.experience;
      var work = this.props.resumeExperience.map(function (work, i) {
        const mainIcons = work.experienceIcons;
        const tech = work.mainTech || [];

        var expIcons = mainIcons.map((iconinfo, j) => (
          <a
            href={iconinfo.url}
            target="_blank"
            rel="noopener noreferrer"
            key={j}
          >
            <i className={iconinfo.url_icon + " experience-url-icon"}></i>
          </a>
        ));

        var techBadges = tech.map((t, j) => (
          <Badge pill className="main-badge mr-2 mb-2" key={j}>
            {t}
          </Badge>
        ));

        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date=""
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className={work.icon + " experience-icon"}></i>}
            key={i}
          >
            <div className="experience-card-header">
              <div className="experience-card-titles">
                <h3 className="vertical-timeline-element-title">
                  {work.company}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {work.title}
                </h4>
              </div>
              {expIcons.length > 0 && (
                <div className="experience-link">{expIcons}</div>
              )}
            </div>

            <div className="experience-date-chip">
              <i className="far fa-calendar-alt mr-1"></i>
              {work.years}
            </div>

            {techBadges.length > 0 && (
              <div className="experience-card-tech">
                <span className="experience-tech-label">Tech Stack</span>
                <div className="mt-1">{techBadges}</div>
              </div>
            )}
          </VerticalTimelineElement>
        );
      });
    }

    return (
      <section id="resume" className="pb-5">
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <span className="text-black" style={{ textAlign: "center" }}>
                {sectionName}
              </span>
            </h1>
          </div>
        </div>
        <div className="col-md-8 mx-auto">
          <VerticalTimeline>
            {work}
            <VerticalTimelineElement
              iconStyle={{
                background: "#AE944F",
                color: "#fff",
                textAlign: "center",
              }}
              icon={
                <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
              }
            />
          </VerticalTimeline>
        </div>
      </section>
    );
  }
}

export default Experience;
