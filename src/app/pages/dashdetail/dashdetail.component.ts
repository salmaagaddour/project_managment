import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
var colors = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    'default': '#172b4d',
    'primary': '#5e72e4',
    'secondary': '#f4f5f7',
    'info': '#11cdef',
    'success': '#2dce89',
    'danger': '#f5365c',
    'warning': '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent',
};
import { ProjectService } from '../tables/project.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashdetail',
  templateUrl: './dashdetail.component.html',
  styleUrls: ['./dashdetail.component.scss']
})
export class DashdetailComponent implements OnInit {
  @ViewChild('totalLoadChart', { static: true }) chartElement: ElementRef;
 
  private chart: Chart;
  public datasets: any;
  project: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  showRoadmapTable = true;
  showActualTable = false;
  selectedTab: 'cost' | 'workload' = 'cost';
  Ressources: any[];
  loads: any[];
  projectId: number;
  projectId1: string;
  public budgetData: number[] = [/* ... */];
  //public totalLoadData: number = [/* ... */];
  totalLoadData: number[] = [];
  months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(private projectService: ProjectService,private route: ActivatedRoute, private router: Router) {this.Ressources = [];this.loads = [];
  }
 

  // Écoutez l'événement émis par le composant de liste de projets
 
  ngOnInit() {
  
    this.route.paramMap.subscribe(params => {
      this.projectId =parseInt(params.get('id'),10);
      this.projectId1 = parseInt(params.get('id'), 10).toString();
      this.projectService.getProjectById(this.projectId1).subscribe(
        (project) => {
          this.project = project;})
      
    this.projectService.getRessource(this.projectId).subscribe(
      (data: any) => {
        this.Ressources = data; 
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
        console.log(this.projectId)
      }
    )
    this.projectService.getload(this.projectId).subscribe(
      (data1: any) => {
        console.log(data1); // Assurez-vous que les données sont correctes
        this.loads = data1; 
      },
      (error: any) => {
        console.error('Error fetching loads:', error);
        console.log(this.projectId)
      }
    )
  });
  for (let month = 1; month <= 12; month++) {
    this.projectService.getcostByMonth(2023,month).subscribe(cost => {
      this.projectService.getloadByMonth(2023,month).subscribe(load => {
        const cost1 = parseFloat(cost);
        const load1 = parseFloat(load);
        let totalLoad = cost1 + load1;
        if (totalLoad === 0) {
          totalLoad = 1;
        }
       
        
        const ratio = this.project.budget / totalLoad;

        // Ajoutez ce ratio aux données de charge totale
        this.totalLoadData.push(ratio);
       

        // Calculez le rapport budget / (coût total + charge totale) pour ce mois
//console.log("ratio =",ratio,"=",this.project.budget,"/",totalLoad)
        // Ajoutez ce ratio aux données de charge totale

        // Si toutes les données pour les 12 mois sont récupérées, créez le graphique
        if (this.totalLoadData.length === 12) {
          this.createChart();
        }
        console.log("load =",this.totalLoadData)
      });
    });
  }

}
createChart(): void {
  // Utilisez les données de totalLoadData pour créer votre graphique
  // Exemple d'utilisation de Chart.js (assurez-vous d'importer la bibliothèque) :
  const chartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: ' Budget / Charge Totale',
        data: this.totalLoadData,
        borderColor: '#FF5733', // Changez la couleur de la ligne
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Couleur de la zone remplie
        pointBackgroundColor: '#FF5733', // Changez la couleur des points
        fill: true,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      x: {
        // Configurations de l'axe des X
        beginAtZero: true, // Commence à 0
        grid: {
          display: true, // Afficher les lignes de la grille de l'axe des X
        },
      },
      y: {
        beginAtZero: true, // Commencez à partir de zéro
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Couleur de la grille de l'axe Y
        },
        ticks: {
          fontColor: 'black', // Couleur des étiquettes de l'axe Y
          min: 0, // Valeur minimale de l'axe Y
          max: Math.max(...this.totalLoadData) + 10, // Ajustez la valeur maximale en fonction de vos données
          callback: function(value) {
            // Formatez les étiquettes de l'axe Y en ajoutant "Budget / " devant la valeur
            return 'Budget / ' + value.toFixed(2); // Format exemple avec 2 décimales
          },
        },
      },
    },
    legend: {
      position: 'bottom', // Position de la légende (en bas)
      labels: {
        fontColor: 'black', // Couleur du texte de la légende
        fontSize: 14, // Taille de la police de la légende
      },
    },
    datasets: [
      {
        label: 'Budget / Charge Totale',
        data: this.totalLoadData,
        borderColor: 'red', // Changez la couleur de la ligne en rouge
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: 'red', // Changez la couleur des points en rouge également si nécessaire
        fill: true,
      },
    ],
  };
  
  // Assurez-vous que votre HTML a un élément avec l'ID 'chart' et définissez ses dimensions
  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  canvas.style.width = '800px'; // Largeur du graphique
  canvas.style.height = '600px'; // Hauteur du graphique (augmentez la hauteur)
  
  // Obtenez le contexte du rendu du graphique
  const ctx = canvas.getContext('2d');
  
  // Créez le graphique
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions,
  });
}

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  public showCost(){
    this.selectedTab = 'cost';
  }
  public showActual(){
    this.selectedTab = 'workload';
  }
  openAddForm(selectedTab: string): void {
    if (selectedTab === 'cost') {
      this.router.navigate(['/addcost', this.projectId]); 
    } else if (selectedTab === 'workload') {
      this.router.navigate(['/addload',this.projectId]); 
    }
  }
  calculateTotalCost(): number {
    if (this.selectedTab === 'cost' && this.Ressources) {
      let totalCost = 0;
      for (const task of this.Ressources) {
        totalCost += task.amount;
      }
      return totalCost;
    }
    return 0; // Return 0 for other tabs (workload)
  }
  calculateTotalDeveloperLoad(): number {
    let totalLoad = 0;
    for (const load of this.loads) {
      totalLoad += load.amount * load.time; // Multiplication d'amount par time
    }
    return totalLoad;
  }
  calculateTotalLoad(): number {
    const totalCost = this.calculateTotalCost();
    const totalDeveloperLoad = this.calculateTotalDeveloperLoad();
  
    return totalCost + totalDeveloperLoad;
  }
  
}
