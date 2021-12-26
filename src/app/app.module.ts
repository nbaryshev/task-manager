import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { workoutsReducer } from './reducers/tasks.reducer';

import { AppComponent } from './app.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutComponent } from './workout/workout.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    WorkoutsListComponent,
    AddWorkoutComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      workoutsList: workoutsReducer
    } as ActionReducerMap<any,any>),
    ReactiveFormsModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
