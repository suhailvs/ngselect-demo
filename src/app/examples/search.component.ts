import { Component, ChangeDetectionStrategy } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError } from 'rxjs/operators'
import { DataService, Person } from '../shared/data.service';
import { Subject, Observable, of, concat } from 'rxjs';


@Component({
    selector: 'select-search',
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <h5>Custom server-side search</h5>
        <hr>
        <p>Use <b>typeahead</b> to subscribe to search term and load async items.</p>
        <label>Multi select + Typeahead + Custom items (tags)</label>
        ---html,true
        <ng-select [items]="people3$ | async"
                   bindLabel="name"
                   [addTag]="true"
                   [multiple]="true"
                   [hideSelected]="true"
                   [loading]="people3Loading"
                   [typeahead]="people3input$"
                   [(ngModel)]="selectedPersons">
        </ng-select>
        ---
        <p style="margin-bottom:300px">
            Selected persons: {{selectedPersons | json}}
        </p>
    `
})
export class SelectSearchComponent {

    people3$: Observable<Person[]>;
    people3Loading = false;
    people3input$ = new Subject<string>();
    selectedPersons: Person[] = <any>[{ name: 'Karyn Wright' }, { name: 'Other' }];

    constructor(private dataService: DataService) { }

    ngOnInit() {        
        this.loadPeople3();
    }    

    private loadPeople3() {
        this.people3$ = concat(
            of([]), // default items
            this.people3input$.pipe(
               debounceTime(200),
               distinctUntilChanged(),
               tap(() => this.people3Loading = true),
               switchMap(term => this.dataService.getPeople(term).pipe(
                   catchError(() => of([])), // empty list on error
                   tap(() => this.people3Loading = false)
               )) 
            )
        );
    }
}


