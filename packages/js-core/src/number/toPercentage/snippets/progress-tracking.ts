import { toPercentage } from "@petr-ptacek/js-core";

// progress tracking example
class TaskProgress {
  private completed = 0;
  private total: number;

  constructor(totalTasks: number) {
    this.total = totalTasks;
  }

  completeTask() {
    if (this.completed < this.total) {
      this.completed++;
    }
  }

  getProgress(): number {
    if (this.total === 0) return 0;
    return toPercentage(this.completed, this.total);
  }

  getProgressString(): string {
    const percentage = this.getProgress();
    return `${this.completed}/${this.total} (${percentage.toFixed(1)}%)`;
  }
}

// usage
const project = new TaskProgress(10);

console.log(project.getProgressString()); // 0/10 (0.0%)

project.completeTask();
project.completeTask();
project.completeTask();

console.log(project.getProgressString()); // 3/10 (30.0%)
