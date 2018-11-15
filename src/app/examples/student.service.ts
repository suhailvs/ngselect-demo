import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }

  getStudents(term) {
    return this.httpClient.get('http://localhost:8000/parent/querystudentsbyterm/', { params: { 'term': term } });
  }
}
