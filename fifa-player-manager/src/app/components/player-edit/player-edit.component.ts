import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  standalone: true,
  imports: [],
  templateUrl: './player-edit.component.html',
  styleUrl: './player-edit.component.css'
})

export class PlayerEditComponent implements OnInit {
  editForm: FormGroup;
  playerId: string;

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      club: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      nationality: ['', Validators.required],
      skills: this.fb.group({
        pace: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        shooting: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        passing: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        dribbling: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        defending: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
        physical: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      }),
    });
  }

  ngOnInit(): void {
    this.playerId = this.route.snapshot.paramMap.get('id')!;
    this.playerService.getPlayerById(this.playerId).subscribe(player => {
      this.editForm.patchValue(player);
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.playerService.updatePlayer(this.playerId, this.editForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
