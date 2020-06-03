import React, { Component } from "react";
import Objectives from './data/Objectives.json';
import update from 'immutability-helper';

export const StateContext = React.createContext({objectives:[],progress:[]});

const objectivesKey = 'state';

export default class Provider extends Component {

    state = this.SetupState();

    SetupState() {
        let state = JSON.parse(localStorage.getItem(objectivesKey));

        if (!state) {
            state = {
                progress: {},
                hideCompleted: false,
                filter: []
            };
        }
        state.objectives = Objectives;
        state.updateProgress = (currentProgress, id) => this.updateProgress(currentProgress, id);
        state.updateFilters = (id) => this.updateFilters(id);
        state.removeFilters = (id) => this.removeFilters(id);
        return state;
    }

    updateProgress = (currentProgress, id) => {
        const updatedState = update(this.state, {
            progress: {
                $merge: {[id]: currentProgress}
            }
        });
        return this.updateAndSave(updatedState);
    };

    updateFilters = (id) => {

        if(this.state.filter.includes(id)) return;

        const updatedState = update(this.state, {
            filter: { $push: [id]}
        });

        return this.updateAndSave(updatedState);
    };

    removeFilters = (id) => {
        const updatedState = {
            filter: this.state.filter.filter(i => i !== id)
        }
        return this.updateAndSave(updatedState);
    };

    updateAndSave(stateUpdate) {
        return new Promise((resolve, reject) => {
            this.setState(stateUpdate, () => {
                try {
                    this.storeStateToLocalStorage();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    storeStateToLocalStorage() {
        const newState = {};

        for (const prop in this.state) {
            if (typeof prop === 'function' || prop === 'objectives') {
                continue;
            }
            newState[prop] = this.state[prop];
        }

        localStorage.setItem(objectivesKey, JSON.stringify(newState));
    }

    render() {
        const { children } = this.props;
        return <StateContext.Provider value={this.state}>{children}</StateContext.Provider>;
    }
}