import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(protected http: HttpClient) {
  }

  getData(title): Observable<any> {
    return this.http.get<any>(`http://www.omdbapi.com/?apikey=51a0506f&t=${title}&plot=full`);
  }
}
