export interface DialogData {
    title: string,
    secondaryButtonRequired?: boolean,
    primaryButtonText: string,
    secondaryButtonText?: string,
    secondaryButtonClick?: () => any
  }