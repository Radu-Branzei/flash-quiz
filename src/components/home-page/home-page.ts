import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-home-page',
  imports: [LucideAngularModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  constructor(private router: Router) { }

  goToQuizConfig() {
    this.router.navigate(['/quiz-config']);
  }
}
