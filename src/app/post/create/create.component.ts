import { Component, OnInit } from '@angular/core';
import { faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from 'src/app/authentication/interfaces/user.interface';
import { PostService } from '../post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public userIcon: IconDefinition;
  public newPost: string;
  constructor(private authenticationService: AuthenticationService, private postService: PostService) {
    this.userIcon = faUser;
    this.newPost = '';
  }

  ngOnInit(): void {
    this.setCreatePostInputHeight();
  }

  get currentUser(): User {
    return this.authenticationService.currentUserValue;
  }

  get isActive(): boolean {
    return this.newPost.length > 5;
  }

  post() {
    this.postService.createPost(this.newPost);
  }

  setCreatePostInputHeight() {
    const createPostInput = document.getElementById('createPost');

    if (!createPostInput) return;

    createPostInput.setAttribute('style', 'height:' + (createPostInput.scrollHeight - 20) + 'px;overflow-y:hidden;');
    createPostInput.addEventListener(
      'input',
      () => {
        createPostInput.style.height = 'auto';
        createPostInput.style.height = createPostInput.scrollHeight - 10 + 'px';
      },
      false
    );
  }
}
