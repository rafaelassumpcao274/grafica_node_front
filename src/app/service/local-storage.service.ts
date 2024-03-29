import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor(private storage:Storage) {
  
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key,btoa( JSON.stringify(value)));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage && this.storage.getItem(key)) {
      return JSON.parse(atob(this.storage.getItem(key)!))
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

}