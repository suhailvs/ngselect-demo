import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { SelectSearchComponent } from './examples/search.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/filter',
        pathMatch: 'full'
    },
    { path: 'filter', component: SelectSearchComponent, data: { title: 'Filter and autocomplete', fileName: 'search.component.ts' } },
 ];

@NgModule({
    imports: [
        BrowserModule,
        NgSelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true
            }
        )
    ],
    declarations: [
        AppComponent,
        SelectSearchComponent,
    ],
    // entryComponents: [ConfirmationComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}

