import { Component } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { StudentsService } from './student.service';
import { Subject, of, concat } from 'rxjs';


@Component({
    selector: 'select-search',
    template: `
        <h5>Custom server-side search</h5>
        <ng-select [items]="students$ | async"
           bindLabel="first_name"
           bindValue="id"
           [multiple]="true"
           [hideSelected]="true"
           [typeahead]="studentsinput$"
           [(ngModel)]="selectedStudents">
           <ng-template ng-option-tmp let-item="item">{{item.first_name}} <small>{{item.student}}</small></ng-template>
        </ng-select>
        ---
        <p style="margin-bottom:300px">
            Selected persons: {{selectedStudents | json}}
        </p>
    `
})
export class SelectSearchComponent {

    students$: any;
    studentsinput$ = new Subject<string>();
    selectedStudents = [];

    constructor(private studentsService: StudentsService) { }

     ngOnInit() {
        this.loadStudents();
    }
    private loadStudents() {
        this.students$ = concat(
            of([]), // default items
            this.studentsinput$.pipe(
               debounceTime(200),
               distinctUntilChanged(),
               switchMap(term => this.studentsService.getStudents(term).pipe(
                   catchError(() => of([])), // empty list on error
               )) 
            )
        );
    }
}


