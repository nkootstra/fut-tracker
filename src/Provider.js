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
        state.updateCombinedObjectives = (objectives,action) => this.updateCombinedObjectives(objectives,action);
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

    updateCombinedObjectives = (objectives, action) => {
        let updatedState = this.state;

        // get highest progression from all the sub objectives
        let highestArray = objectives.map( sub => {
            return this.state.progress[sub.id]?.progression || 0;
        });
        let highestAmount = Math.max(...highestArray);

        objectives.forEach( sub => {
            let current = this.state.progress[sub.id]?.progression || 0;

            let updatedProgression = (action === 'plus') ? current+1 : current -1;

            if(current < sub.amount || (action === 'minus' && current >= highestAmount)) {
                let completed = updatedProgression >= sub.amount;
                updatedState = update(updatedState, {
                    progress: {
                        $merge: {[sub.id]: {progression:updatedProgression, completed:completed}}
                    }
                });
            }
        });
        return this.updateAndSave(updatedState);
    }

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