import { UserService } from 'src/app/services/user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class errorNotifyService {

  constructor(
    private toaster: ToastrService,
    private userService: UserService
  ) { }

  showSuccess(message: string): void {
    this.toaster.success(message)
  }

  showError(error: { status, message }): void {
    if (error.status === 0) {
      this.toaster.error("Ran out of API calls", '', { timeOut: 3000 });
      this.userService.setOutOfApiCalls()
    } else {
      this.toaster.error(error.message)
    }
  }
}