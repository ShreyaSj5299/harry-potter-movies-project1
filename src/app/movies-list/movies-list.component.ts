import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../model/movie';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { MinutesToHourPipe } from '../pipes/minutes-to-hour.pipe';
import { DollarConverterPipe } from '../pipes/dollar-converter.pipe';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
    SearchPipe,
    MinutesToHourPipe,
    DollarConverterPipe,
  ],
})
export class MoviesListComponent implements OnInit {
  moviesList: Movie[] = [];
  movieTitle: string = '';
  releaseYear: number | undefined;
  erroMessage: string = '';

  constructor(private movieService: MovieService) {}

  getMoviesList() {
    this.movieService.getMoviesList().subscribe(
      (data) => {
        this.moviesList = data;
      },
      (err) => {
        console.log(err);
        this.erroMessage = err.error.error.message || err.message;
      }
    );
  }

  ngOnInit(): void {
    this.getMoviesList();
  }
}
