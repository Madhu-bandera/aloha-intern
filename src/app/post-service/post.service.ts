import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private http: HttpClient) { }

    getPosts() {
        return new Promise((resolve, reject) => {
            this.http
                .get(' https://jsonplaceholder.typicode.com/posts')
                .subscribe((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
        });
    }

    createPost(reqObj: any) {
        return new Promise((resolve) => {
            this.http
                .post<any>(
                    ' https://jsonplaceholder.typicode.com/posts',
                    JSON.stringify(reqObj),
                    {
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                .subscribe((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
        });
    }

    updatePost(reqObj: any) {
        return new Promise((resolve) => {
            this.http
                .put<any>(
                    ' https://jsonplaceholder.typicode.com/posts/' + reqObj.id,
                    JSON.stringify(reqObj),
                    {
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                )
                .subscribe((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
        });
    }

    deletePost(id: any) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(' https://jsonplaceholder.typicode.com/posts/' + id)
                .subscribe((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
        });
    }

}
