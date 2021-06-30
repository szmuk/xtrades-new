import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TrendingState, TrendingStore } from './trending.store';

@Injectable({
  providedIn: 'root'
})
export class TrendingQuery extends QueryEntity<TrendingState, any> {
  constructor(protected store: TrendingStore) {
    super(store);
  }
}
