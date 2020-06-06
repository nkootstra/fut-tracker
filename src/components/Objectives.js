import React, { Component } from "react";
import { StateContext } from "../Provider";
import Objective from './Objective';

export default class Objectives extends Component {

    render() {
        const { objectives, filter } = this.context;
        return (
            <div>
                { objectives.filter(function (objective) {
                    return !filter.includes(objective.id);
                }).map(objective => {
                    let isCompleted = (objective.objectives.length-(objective.objectives.filter(sub => {return this.context.progress[sub.id]?.completed || false;}).length))===0;
                    return <Objective key={objective.id}
                                      parent={objective.id}
                                      objective={objective}
                                      subObjectives={objective.objectives}
                                      isCompleted={isCompleted}/>;
                })
                }
            </div>
        );
    }
}

Objectives.contextType = StateContext;