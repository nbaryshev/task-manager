import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { AddExercise, DeleteExercise, DeleteWorkout, UpdateExercise, UpdateWorkout } from '../actions/tasks.actions';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit {
  @Input() workout: any;
  @Input() workoutIndex: any;

  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(
    private fb: FormBuilder,
    private store: Store<{workoutsList: {workouts: Workout[]}}>
  ) { }

  exerciseForm = this.fb.group({
    name: ['', Validators.required],
    completed: [false]
  })

  addNewExercise() {
    this.store.dispatch(new AddExercise({index: this.workoutIndex, exercise: this.exerciseForm.value}));
    this.exerciseForm.reset();
  }

  deleteExercise(name: string) {
    this.store.dispatch(new DeleteExercise({index: this.workoutIndex, exerciseName: name}));
  }

  updateExercise(exercise: Exercise, index: number, completed: boolean) {
    const exerciseCopy = Object.assign({}, exercise);
    exerciseCopy.completed = completed;
    this.store.dispatch(new UpdateExercise({workoutIndex: this.workoutIndex, exercise: exerciseCopy, exerciseIndex: index}));
  }

  updateWorkout(completed: boolean) {
    if (!this.hasNotCompletedExercises()) {
      const workoutCopy = Object.assign({}, this.workout);
      workoutCopy.completed = completed;
      this.store.dispatch(new UpdateWorkout({workoutIndex: this.workoutIndex, workout: workoutCopy}))
    }
  }

  deleteWorkout() {
    this.store.dispatch(new DeleteWorkout({workout: this.workout}));
  }

  hasNotCompletedExercises() {
    return this.workout.exercises.filter((exercise:Exercise) => !exercise.completed).length > 0;
  }

  ngOnInit(): void { }

}