import React, { Component } from "react";
import { StateContext } from '../Provider';
import SubObjective from "./SubObjective";
import Countdown from "./Countdown";

export default class Objective extends Component {

    constructor(props) {
        super(props);
        this.handleProgression = this.handleProgression.bind(this);
        this.hideObjective = this.hideObjective.bind(this);
    }

    handleProgression(currentProgress, id) {
        this.context.updateProgress(currentProgress, id);
    }

    hideObjective() {
        this.context.updateFilters(this.props.objective.id);
    }

    render() {
        return (
            <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow pb-5 mb-5">
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
                        <div className="ml-4 mt-2">
                            <div className="sm:flex-none md:flex md:items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {this.props.objective.title}
                                </h3>
                                <Countdown
                                    className={"sm:ml-0 sm:mt-2 md:mt-0 md:ml-4 px-2 py-1 font-medium text-sm leading-5 rounded-md text-gray-600 bg-gray-200"}
                                    date={this.props.objective.end_date}/>
                            </div>
                            <span className="pt-3 text-xs text-gray-600 hidden md:block">{this.props.objective.description}</span>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                          <span className="inline-flex rounded-md shadow-sm">
                                <button type="button"
                                        onClick={this.hideObjective}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                                    <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"></path>
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                                    </svg>
                                    Hide objective
                                </button>
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