import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { SocketIoService } from '../socket-io.service';

@NgModule({
  declarations: [PostComponent, AllPostsComponent, CreateComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  providers: [SocketIoService],
  exports: [AllPostsComponent],
})
export class PostModule {}
