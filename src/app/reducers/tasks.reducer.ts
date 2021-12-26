import * as WorkoutActions from "../actions/tasks.actions"
import { Workout } from "../models/workout.model"

const defaultState = {
  workouts: [{
    name: "Day 1",
    completed: false,
    exercises: [{
      name: "push-up",
      completed: false
    }]
  },
  {
    name: "Day 2",
    completed: false,
    exercises: [{
      name: "push-up",
      completed: false
    }]
  }]
}

let initialState = setInitialState();

function setInitialState() {
  return localStorage.state ? JSON.parse(localStorage.state) : defaultState;
}

export function workoutsReducer(state = initialState, action: WorkoutActions.Actions) {
  switch(action.type) {
    case WorkoutActions.ADD_WORKOUT:
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts: [...state.workouts, action.payload]
      }));
      return {
        ...state,
        workouts: [...state.workouts, action.payload]
       };
    case WorkoutActions.ADD_EXERCISE:
      const workouts = state.workouts.map((workout: Workout, index: number) => {
        if (index != action.payload.index) {
          return workout;
        }
        else {
          const currentWorkout = {...workout}
          currentWorkout.completed = false;
          const exercises = [
            ...currentWorkout.exercises,
            action.payload.exercise
          ]
          workout = currentWorkout;
          return { ...currentWorkout, exercises: exercises }
        }
      })
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts
      }));
      return {
        ...state,
        workouts
      }  
    case WorkoutActions.DELETE_EXERCISE:
      const workoutsAll = state.workouts.map((workout: Workout, index: number) => {
        if (index != action.payload.index) {
          return workout;
        }
        else {
          const exercises = workout.exercises.filter(exercise => exercise.name != action.payload.exerciseName);
          return { ...workout, exercises }
        }
      })
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts: workoutsAll
      }));
      return {
        ...state,
        workouts: workoutsAll
      }
    case WorkoutActions.UPDATE_EXERCISE:
      const workoutsUpdExcercise = state.workouts.map((workout: Workout, index: number) => {
        if (index != action.payload.workoutIndex) {
          return workout;
        }
        else {
          const exercise = workout.exercises[action.payload.exerciseIndex];
          const updatedExercise = {
            ...exercise,
            ...action.payload.exercise
          };
          const updatedExercises = [...workout.exercises]
          updatedExercises[action.payload.exerciseIndex] = updatedExercise;
          if (!action.payload.exercise.completed) {
            const workoutUpdExercise = {...workout}
            workoutUpdExercise.completed = false
            return {
              ...workoutUpdExercise,
              exercises: updatedExercises
            }
          }
          return {...workout, exercises: updatedExercises}
        }
        })
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts: workoutsUpdExcercise
      }));
      return {
        ...state,
        workouts: workoutsUpdExcercise
      }
    case WorkoutActions.UPDATE_WORKOUT:
      const workoutsUpdated = [...state.workouts]
      workoutsUpdated[action.payload.workoutIndex] = action.payload.workout
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts: workoutsUpdated
      }))
      return {
        ...state,
        workouts: workoutsUpdated
      }
    case WorkoutActions.DELETE_WORKOUT:
      localStorage.setItem('state', JSON.stringify({
        ...state,
        workouts: state.workouts.filter((workout: Workout) => workout != action.payload.workout)
      }));
      return {
        ...state,
        workouts: state.workouts.filter((workout: Workout) => workout != action.payload.workout)
      }
    default:
      return state;
  }
}