export interface ProgressStep {
  message: string;
  target: number;
  isError?: boolean;
  errorTitle?: string;
  errorMessage?: string;
}

export const PROGRESS_STEPS: ProgressStep[] = [
  { message: 'Installing Wisdom...', target: 7 },
  { message: 'Optimizing Creativity...', target: 14 },
  { message: 'Installing Better Luck...', target: 21 },
  { message: 'Loading Business Empire...', target: 28 },
  { message: 'Preparing Editing Skills...', target: 35 },
  { message: 'Installing More Happiness...', target: 42 },
  { message: 'Searching for Dream Bike...', target: 49 },
  { message: 'Rendering Future...', target: 56 },
  { message: 'Calibrating Gaming Skills...', target: 63 },
  { message: 'Downloading Success...', target: 70 },
  {
    message: 'Installing Infinite Money...',
    target: 75,
    isError: true,
    errorTitle: 'Error.',
    errorMessage: 'Feature requires grinding.',
  },
  { message: 'Backing up Good Memories...', target: 82 },
  {
    message: 'Installing Heavy Bike...',
    target: 88,
    isError: true,
    errorTitle: 'Unable to complete.',
    errorMessage: 'Mission not finished.',
  },
  { message: 'Generating New Adventures...', target: 95 },
  { message: 'Finalizing Update...', target: 100 },
];
