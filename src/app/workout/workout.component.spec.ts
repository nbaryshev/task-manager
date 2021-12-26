import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutComponent } from './workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { workoutsReducer } from '../reducers/tasks.reducer';

fdescribe('WorkoutComponent', () => {
  let component: WorkoutComponent;
  let fixture: ComponentFixture<WorkoutComponent>;
  let element: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WorkoutComponent
      ],
      imports: [
        StoreModule.forRoot({
          workoutsList: workoutsReducer
        } as ActionReducerMap<any,any>),
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    component.workout = {
      name: "Day 1",
      completed: false,
      exercises: [
        {
          name: "push-ups",
          compeleted: false        
        },
        {
          name: "running",
          completed: false
        }
      ]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new exercise to the product', () => {
    expect(element.querySelectorAll(`[data-hook='exercise-name']`).length).toEqual(2);
  });
});
