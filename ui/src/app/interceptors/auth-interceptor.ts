import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, tap, throwError } from "rxjs";

export function authInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
    let router = inject(Router)
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            console.error(err.message, err)
            if (err.status === HttpStatusCode.Unauthorized) {
                console.log("Intercepted 401 as error")
                router.navigate(['/sign-in'])
            }
            return next(req)
        }),
        tap((event) => {
            if (event.type === HttpEventType.Sent) {
                console.log('[REQUEST] -> ',req.method, req.urlWithParams, req.method !== 'GET' ? JSON.stringify(req.body) : null)
            }
            if (event.type === HttpEventType.Response) {
                console.log('[RESPONSE] -> ', JSON.stringify(event.body))
            }
        })
        
    )
}