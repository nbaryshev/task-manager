import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss']
})
export class WorkoutsListComponent implements OnInit {

  workouts!: Observable<{workouts: Workout[]}>;

  constructor(
    private store: Store<{workoutsList: {workouts: Workout[]}}>
  ) { }

  ngOnInit(): void {
    this.workouts = this.store.select('workoutsList')
  }

}
