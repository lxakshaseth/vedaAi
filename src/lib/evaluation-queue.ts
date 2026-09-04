import { AssessmentResult } from '@/types/assessment';

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';
export type JobPriority = 'high' | 'normal' | 'low';

export interface EvaluationJob {
  id: string;
  studentName: string;
  studentId: string;
  paperFileName: string;
  status: JobStatus;
  priority: JobPriority;
  progressPercent: number;
  result?: AssessmentResult;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

type QueueListener = (jobs: EvaluationJob[]) => void;

export class EvaluationQueueManager {
  private jobs: EvaluationJob[] = [];
  private concurrencyLimit: number = 2;
  private isRunning: boolean = false;
  private listeners: Set<QueueListener> = new Set();

  public subscribe(listener: QueueListener): () => void {
    this.listeners.add(listener);
    listener([...this.jobs]);
    return () => this.listeners.delete(listener);
  }

  public addJob(
    studentName: string,
    studentId: string,
    paperFileName: string,
    priority: JobPriority = 'normal'
  ): EvaluationJob {
    const newJob: EvaluationJob = {
      id: 'job_' + Math.random().toString(36).substring(2, 9),
      studentName,
      studentId,
      paperFileName,
      status: 'queued',
      priority,
      progressPercent: 0,
      createdAt: new Date().toISOString(),
    };

    if (priority === 'high') {
      this.jobs.unshift(newJob);
    } else {
      this.jobs.push(newJob);
    }

    this.notify();
    this.processNext();
    return newJob;
  }

  public getJobs(): EvaluationJob[] {
    return [...this.jobs];
  }

  public clearCompleted(): void {
    this.jobs = this.jobs.filter((j) => j.status === 'queued' || j.status === 'processing');
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((l) => l([...this.jobs]));
  }

  private async processNext(): Promise<void> {
    const activeCount = this.jobs.filter((j) => j.status === 'processing').length;
    if (activeCount >= this.concurrencyLimit) return;

    const nextJob = this.jobs.find((j) => j.status === 'queued');
    if (!nextJob) return;

    nextJob.status = 'processing';
    nextJob.progressPercent = 10;
    this.notify();

    // Simulate step progress
    const progressInterval = setInterval(() => {
      if (nextJob.status === 'processing' && nextJob.progressPercent < 90) {
        nextJob.progressPercent += 20;
        this.notify();
      }
    }, 400);

    setTimeout(() => {
      clearInterval(progressInterval);
      nextJob.status = 'completed';
      nextJob.progressPercent = 100;
      nextJob.completedAt = new Date().toISOString();
      this.notify();
      this.processNext();
    }, 2000);
  }
}

export const evaluationQueue = new EvaluationQueueManager();
