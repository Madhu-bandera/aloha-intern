import { Component, OnInit } from '@angular/core';
import { PostService } from '../post-service/post.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
    posts: any;
    form!: FormGroup;
    id: any;

    constructor(private service: PostService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.getPosts();
        this.form = this.fb.group({
            title: ["", Validators.required],
            body: ["", Validators.required],
            userId: ["", Validators.required]
        })
    }

    createPost() {
        if (this.form.valid) {
            this.service.createPost(this.form.value).then(res => console.log("res after create", res)).catch(err => console.log("err", err))
            this.getPosts();
            this.form.reset();
        }
        else {
            alert("Please fill all fields")
        }
    }



    getPosts() {
        this.service
            .getPosts()
            .then((res) => {
                this.posts = res;
            })
            .catch((err) => {
                console.log('err', err);
            });
    }


    deletePost(id: any) {
        this.service
            .deletePost(id)
            .then((res) => {
                this.getPosts();
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    submit() {
        if (this.id) {
            this.updatePost();
        }
        else {
            this.createPost();
        }
    }


    updatePost() {
        if (this.form.valid) {
            this.service.updatePost({ ...this.form.value, id: this.id }).then(res => console.log("res after update", res)).catch(err => console.log("err", err))
            this.getPosts();
            this.form.reset();
            this.id = undefined;
        }
        else {
            alert("Please fill all fields")
        }
    }
    patchValue(user: any) {
        this.form.patchValue(user);
        this.id = user.id;
    }
}
