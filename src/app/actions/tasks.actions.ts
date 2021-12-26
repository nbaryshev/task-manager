import { Action } from "@ngrx/store"
import { Exercise } from "../models/exercise.model"
import { Workout } from "../models/workout.model"

export const ADD_WORKOUT       = 'ADD_WORKOUT'
export const DELETE_WORKOUT    = 'DELETE_WORKOUT'
export const UPDATE_WORKOUT    = 'UPDATE_WORKOUT'
export const ADD_EXERCISE      = 'ADD_EXERCISE'
export const DELETE_EXERCISE   = 'DELETE_EXERCISE'
export const UPDATE_EXERCISE   = 'UPDATE_EXERCISE'

export class AddWorkout implements Action {
  readonly type = ADD_WORKOUT
  constructor(public payload: Workout) {}
}

export class UpdateWorkout implements Action {
  readonly type = UPDATE_WORKOUT
  constructor(public payload: {workoutIndex: number, workout: Workout}) {}
}

export class DeleteWorkout implements Action {
  readonly type = DELETE_WORKOUT
  constructor(public payload: {workout: Workout}) {}
}

export class AddExercise implements Action {
  readonly type = ADD_EXERCISE
  constructor(public payload: {index: number, exercise: Exercise}) {}
}

export class DeleteExercise implements Action {
  readonly type = DELETE_EXERCISE
  constructor(public payload: {index: number, exerciseName: string}) {}
}

export class UpdateExercise implements Action {
  readonly type = UPDATE_EXERCISE
  constructor(public payload: {workoutIndex: number, exercise: Exercise, exerciseIndex: number}) {}
}


export type Actions = 
  | AddWorkout
  | UpdateWorkout
  | DeleteWorkout
  | AddExercise
  | DeleteExercise
  | UpdateExercise;