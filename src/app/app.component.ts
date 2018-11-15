

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {
    }

    ngOnInit() {
    }

    

}
