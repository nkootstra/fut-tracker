import React, { Component } from "react";
import { StateContext } from '../Provider';
import SubObjective from "./SubObjective";
import Countdown from "./Countdown";

export default class Objective extends Component {

    constructor(props) {
        super(props);
        this.handleProgression = this.handleProgression.bind(this);
    }

    handleProgression(currentProgress, id) {
        this.context.updateProgress(currentProgress, id);
    }

    render() {
        return (
            <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow pb-5 mb-5">
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {this.props.objective.title}
                            </h3>
                            <span className="text-xs text-gray-600">{this.props.objective.description}</span>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                          <span className="inline-flex">
                            <Countdown date={this.props.objective.end_date}/>
                          </span>
                        </div>
                    </div>
                </div>
                <ul aria-disabled="true">
                    { this.props.subObjectives.map( sub => {

                        let progression = this.context.progress[sub.id];

                        return (<SubObjective key={sub.id}
                                              parent={this.props.parent}
                                              objective={sub}
                                              currentProgression={progression}
                                              handleProgress={this.handleProgression}/>);


                    })}
                </ul>
            </div>
        );
    }
}

Objective.contextType = StateContext;