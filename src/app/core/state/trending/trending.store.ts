import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Trending } from '../../models/trending';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TrendingState extends EntityState<Trending> {
}

const initialState = {
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'trending', idKey: 'symbol' })
export class TrendingStore extends EntityStore<TrendingState, Trending> {
  constructor() {
    super(initialState);
  }
}
