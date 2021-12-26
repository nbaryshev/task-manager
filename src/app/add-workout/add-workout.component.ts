import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Workout } from '../models/workout.model';
import { AddWorkout } from '../actions/tasks.actions';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private store: Store<{workoutsList: {workouts: Workout[]}}>
  ) { }

  workoutForm = this.fb.group({
    name: ['', Validators.required],
    completed: [false],
    exercises: this.fb.array([this.createExercise()])
  })

  get exercises() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  createExercise(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      completed: [false]
    })
  }

  addExercise() {
    this.exercises.push(this.createExercise());
  }

  onSubmit() {
    let formData = this.workoutForm.value
    this.store.dispatch(new AddWorkout(formData));
    this.workoutForm.reset();
    this.exercises.clear();
    this.addExercise();
  }

  ngOnInit(): void { }

}
