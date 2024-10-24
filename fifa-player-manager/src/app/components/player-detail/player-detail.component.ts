import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [],
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent implements OnInit {
  player: any;
  radarChart: any;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayerById(playerId).subscribe(player => {
      this.player = player;
      this.createRadarChart(player.skills);
    });
  }

  createRadarChart(skills: any[]) {
    const skillLabels = skills.map(skill => skill.skillName);
    const skillValues = skills.map(skill => skill.value);

    this.radarChart = new Chart('radarCanvas', {
      type: 'radar',
      data: {
        labels: skillLabels,
        datasets: [
          {
            label: 'Skills',
            data: skillValues,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { display: false },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
  }
}
