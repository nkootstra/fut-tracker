import React, { Component } from 'react';
import { StateContext } from "../Provider";
import PropTypes from 'prop-types';
import Transition from '../Transition';

export default class Header extends Component {

    state = {
        showHiddenFilter: false
    }

    render() {
        return (
            <div>
                <div className="p-6 bg-gray-800">
                    <div className="container mx-auto lg:px-6 sm:px-0">
                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                                    FUT <span role="img" aria-label="tractor">🚜</span>
                                </h2>
                            </div>
                            <div className="mt-4 flex md:mt-0 md:ml-4">

                            <span className="shadow-sm rounded-md">
                                <button type="button" onClick={() => this.setState({showHiddenFilter:!this.state.showHiddenFilter})}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out">
                                Hidden objectives
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                <HiddenFilter show={this.state.showHiddenFilter} />
            </div>

        );
    }
}

class HiddenFilter extends Component {

    constructor(props) {
        super(props);
        this.showObjective = this.showObjective.bind(this);
    }

    showObjective(id) {
        this.context.removeFilters(id);
    }

    render() {
        let { objectives, filter } = this.context;
        return (
            <Transition
                show={this.props.show}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <div className="mt-6 container mx-auto ease-out duration-300">
                    <section className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        <div className="overflow-auto max-h-48">
                            {
                                filter.length === 0 ? (
                                    <span className="w-auto flex justify-center">No hidden objectives</span>
                                ) : filter.map(o => {
                                    let objective = objectives.find(obj => obj.id === o);
                                    if(!objective) {
                                        this.showObjective(o);
                                    }
                                    return <HiddenItem key={o} objective={objective}
                                                       showObjective={this.showObjective}/>;
                                })
                            }
                        </div>
                    </section>
                </div>
            </Transition>
        );
    }
}

class HiddenItem extends Component {

    constructor(props) {
        super(props);
        this.showObjective = this.showObjective.bind(this);
    }

    showObjective() {
        this.props.showObjective(this.props.objective.id)
    }

    render() {
        return (
            <div className="flex justify-between items-center flex-wrap py-1.5">
                <span>{this.props.objective.title}</span>

                    <button type="button"
                            onClick={this.showObjective}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150">
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                        </svg>
                        Show objective
                    </button>
            </div>);
    }
}

HiddenFilter.propTypes = {
    show: PropTypes.bool.isRequired
};

HiddenFilter.contextType = StateContext;