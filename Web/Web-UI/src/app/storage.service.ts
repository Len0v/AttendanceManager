import { Injectable } from '@angular/core';
import {CoolSessionStorage} from 'angular2-cool-storage';
import {EventsList} from './events/events.model/events-list.enum';

@Injectable()
export class StorageService {
  constructor(private sessionStorage: CoolSessionStorage) { }

  set(name, item){
    this.sessionStorage.setObject(name, item);
  }

  get(name){
    return JSON.parse(this.sessionStorage.getItem(name));
  }
}
