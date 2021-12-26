import { Exercise } from "./exercise.model"

export interface Workout {
  name: string,
  completed: boolean,
  exercises: Exercise[]
}