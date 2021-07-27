import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllPostsComponent } from './all-posts/all-posts.component';



@NgModule({
  declarations: [
    PostComponent,
    AllPostsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [AllPostsComponent]
})
export class PostModule { }
