<script>
import { Pie } from "vue-chartjs";
import datalabels from "chartjs-plugin-datalabels";

export default {
  extends: Pie,
  props: {
    chartLabels: Array,
    chartData: Array,
    chartDataColor: Array,
  },
  mounted() {
    this.addPlugin(datalabels);
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            backgroundColor: this.chartDataColor,
            data: this.chartData,
          }
        ],

      },
      {
        plugins: {
          datalabels: {
            color: "black",
            textAlign: "center",
            font: {
              weight: "normal",
              size: 18
            }
          },
        },
        legend: {
          position: 'bottom'
        }
      },
    );
  }
};
</script>
