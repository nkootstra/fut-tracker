import React, { Component } from "react";
import { StateContext } from "../Provider";
import Objective from './Objective'

export default class Objectives extends Component {

    render() {
        const { objectives, filter } = this.context;
        return (
            <div>
                { objectives.filter(function (objective) {
                    return !filter.includes(objective.id);
                }).map(objective =>
                    <Objective key={objective.id}
                               parent={objective.id}
                               objective={objective}
                               subObjectives={objective.objectives}/>)
                }
            </div>
        );
    }
}

Objectives.contextType = StateContext;