import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/firestore';

declare var google;

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  private static googleLoaded:any;
  constructor(public user: UserService, private db:AngularFirestore) { }
  getGoogle() {
    return google;
}

  ngOnInit() {
    console.log(this.user.getUID())
    if(!ReportPage.googleLoaded) {
      ReportPage.googleLoaded = true;
      google.charts.load('current',  {packages: ['corechart', 'bar']});
    }
    google.charts.setOnLoadCallback(() => this.drawGraph());
    this. firebaseDisplay();
  }

  firebaseDisplay(){
    var users = this.db.collection('users').doc(this.user.getUID());
    users.get().subscribe(function(snapshot){
      console.log("sirisha")  
      console.log(snapshot);
      console.log(snapshot.data())

    })
    

  }
  
  drawGraph() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Grocery', 1],
          ['Entertainment', 5],
          ['Gas', 1]
        ]);
    
        // Set chart options
        var options = {
          'title': 'Pie chart based on categorization',
          'width': 400,
          'height': 300
        };
    
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        
        var data1 = new google.visualization.arrayToDataTable([
          ['Date', 'Grocery', 'Entertainment', 'Gas'],
          ['4/7',  1,      2,         0],
          ['4/7',  0,      3,         1],
          ['4/7',  0,      1,         0],
        ]);

        var options1 = {
          title : 'Bar chart on categorization',
          vAxis: {title: 'count'},
          hAxis: {title: 'date'},
          seriesType: 'bars',
          series: {5: {type: 'line'}}
        };

        var chart1 = new google.visualization.ComboChart(document.getElementById('chart_div1'));
        chart1.draw(data1, options1);      
  }
}
