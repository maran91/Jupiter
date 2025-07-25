import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {FrontendResponse, Ribbon} from '../models/front-page-models';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class JupiterApiService {
    private readonly http = inject(HttpClient);

    private readonly API_URL = environment.apiBaseUrl + '/category/getByUrl?url=video&domain=jupiter.err.ee';

    getFrontPageRibbons(): Observable<Ribbon[]> {
        return this.http.get<FrontendResponse>(this.API_URL).pipe(map(this.extractHighTimelineRibbons), catchError(this.handleError));
    }

    private extractHighTimelineRibbons(response: FrontendResponse): Ribbon[] {
        return response.data.category.frontPage.filter(ribbon => ribbon.highTimeline);
    }

    private handleError(error: unknown): Observable<Ribbon[]> {
        return of([]);
    }
}
