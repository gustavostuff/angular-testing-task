import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter, Observable, pluck, share, shareReplay, Subscription, tap } from 'rxjs';
import { Bug } from './models/bug.model';
import { BugsService } from './services/bugs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public searchSubscription: Subscription = new Subscription();
  public bugs$?: Observable<Bug[]>;
  public loaded: boolean = false;

  constructor(private bugsService: BugsService) {
    this.searchForm = new FormGroup({
      searchValue: new FormControl()
    });
  }


  ngOnInit(): void {
    this.searchSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      filter(data => data.searchValue.trim().length > 1),
    ).subscribe(() => {
      this.bugs$ = this.bugsService.getBugs(this.searchForm.get('searchValue')?.value);
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
