import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public isDarkModeEnabled: boolean = false

  constructor(private userService: UserService) {
    this.userService.userStore.subscribe(user => {
      if (this.isDarkModeEnabled !== user.darkMode) {
        this.isDarkModeEnabled = user.darkMode
        this.toggleDarkMode()
      }
    })
  }

  public toggleDarkMode() {
    if (this.isDarkModeEnabled) {
      this.setDarkTheme()
    } else {
      this.setLightTheme()
    }
  }

  private setDarkTheme() {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  }

  private setLightTheme() {
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
  }
}
