import React, { Component } from 'react';
import "./proj-button.css";
class ProjectButton extends Component {
    constructor(props) {
        super(props);
        this.hideButton = this.hideButton.bind(this);
    }

    hideButton() {
        if (this.props.canRun) {
            const button = document.getElementById("project-button");
            const projects = [...document.getElementsByClassName("project-blurb")];
            button.classList.add("project-button");
            setTimeout(() => button.classList.remove("project-button-reverse"));
            this.props.setCanRun(false);
            projects.forEach((elem, i) => {
                setTimeout(() => {
                    elem.classList.add("animate-forward");
                }, 750 * i);
                setTimeout(() => elem.classList.remove("animate-backward"));
            })
        }
    }

    render() {
        return (
            <div id="project-button" className="absolute text-xl w-64 lg:w-1/4 text-white text-center" onClick={this.hideButton}>
                <span>Projects?</span>
            </div>
        );
    }
}

export default ProjectButton;