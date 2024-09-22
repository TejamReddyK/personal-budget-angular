import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = []; // Change to an array to store multiple entries

  constructor(private http: HttpClient) {}

  // Fetch data only if it's not already populated
  fetchData(): Observable<any[]> {
    if (this.data.length === 0) {
      return this.http.get<any[]>('http://localhost:3000/budget');
    } else {
      return of(this.data); // Return existing data as an observable
    }
  }

  // Method to get the stored data
  getData(): any[] {
    return this.data;
  }

  // Method to set the data
  setData(data: any[]): void {
    this.data = data;
  }
}
