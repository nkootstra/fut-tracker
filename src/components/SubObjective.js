import React, { Component } from "react";

export default class SubObjective extends Component {

    constructor(props) {
        super(props);
        this.progressBarRef = React.createRef();
    }

    handleProcess(progression) {
        // check if completed
        let completed = progression >= this.props.objective.amount;

        this.props.handleProgress(
            {progression:progression, completed:completed},
            this.props.objective.id
        )
    }

    render() {
        let currentProgression = this.props.currentProgression?.progression || 0;
        let isCompleted = this.props.currentProgression?.completed || false;

        return (

            <li className={ isCompleted ? 'opacity-25' : '' }>
                <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
                            {this.props.objective.title} ({currentProgression}/{this.props.objective.amount})
                        </div>
                        <div className="flex">
                            <div className="inline-flex block h-2 w-32 md:w-64 bg-gray-100 rounded-md">
                                <span className="h-full w-auto bg-green-400 rounded-md text-center progressbar" ref={this.progressBarRef}
                                      style={{width: `${Math.round( (currentProgression/this.props.objective.amount) * 100 + Number.EPSILON)}%` }}></span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                        <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                {this.props.objective.description}
                            </div>
                        </div>
                        <div className="sm:flex">
                            <div className="mr-1 flex items-center">
                                {currentProgression!== 0 &&
                                <button type="button"
                                        onClick={() => this.handleProcess(currentProgression-1)}
                                        className="relative inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-3 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline-indigo focus:border-red-700 active:bg-red-700">
                                    -1
                                </button>}

                                <button type="button"
                                        disabled={isCompleted}
                                        onClick={() => this.handleProcess(currentProgression+1)}
                                        className="ml-2 relative inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-3 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
                                    +1
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}