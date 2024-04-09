import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieData } from '../model/movie';
import { MinutesToHourPipe } from "../pipes/minutes-to-hour.pipe";
import { DollarConverterPipe } from '../pipes/dollar-converter.pipe';
@Component({
    selector: 'app-movieDetilas',
    standalone: true,
    templateUrl: './movie.component.html',
    styleUrl: './movie.component.css',
    imports: [MinutesToHourPipe, DollarConverterPipe]
})
export class MovieComponent implements OnInit {
  movie_id: string = '';
  movie:MovieData={
    id: '',
    title: '',
    duration: '',
    budget: '',
    release_date: '',
    box_office: '',
    cinematographers: [],
    poster: '',
    producers: [],
    summary: ''
  } ;
  erroMessage: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((movie_id) => {
      this.movie_id = movie_id['movieId'];
    });

    this.movieService.getMovieById(this.movie_id).subscribe((movie) => {
      this.movie=movie;
    },
    (err) => {
      console.log(err);
      this.erroMessage = err.error.error.message || err.message;
    });
  }

  backToHome():void{
    this.router.navigate(['/movies']);
  }
}
