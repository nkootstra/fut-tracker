import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from '../Transition';

export default class Header extends Component {

    state = {
        showFilter: false
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
                                <button type="button" onClick={() => this.setState({showFilter:!this.state.showFilter})}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out">
                                Filter
                                </button>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                <HiddenFilter show={this.state.showFilter} />
            </div>

        );
    }
}

class HiddenFilter extends Component {
    render() {
        return (
            <Transition
                show={this.props.show}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <div className="container mx-auto ease-out duration-300">
                    <section className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                        No hidden items mate
                    </section>
                </div>
            </Transition>
        );
    }
}

HiddenFilter.propTypes = {
    show: PropTypes.string.isRequired
};