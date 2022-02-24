import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, filter, map, Observable, of } from 'rxjs';
import { Bug } from '../models/bug.model';
import { GithubResponse } from '../models/github-response.model';

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  constructor(private http: HttpClient) { }

  private bugsUrl: string = 'https://api.github.com/search/issues?q=repo%3afacebook%2freact+bug+in%3atitle';

  public getBugs(searchTerm?: string): Observable<Bug[]> {
    return this.http.get<GithubResponse>(this.bugsUrl).pipe(
      catchError(err => {
        console.error('An error ocurred while loading the bugs!');
        return of(err);
      }),
      map((data: GithubResponse) => {
        if (!data.items || !data.items.length) {
          return [];
        }

        return data.items.filter(bug => {
          return bug.title.toLocaleLowerCase().includes(searchTerm?.toLocaleLowerCase() || '');
        });
      })
    );
  }
}
