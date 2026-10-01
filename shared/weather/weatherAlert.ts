export class NwsAlertCollection {
  alerts: NwsAlertFeature[] = [];
  title: string = '';
  updated: string = '';
}

export class NwsAlertFeature {
  id: string = '';
  alertData: NwsAlert = new NwsAlert();
}

export class NwsAlert {
  event: string = '';
  headline: string = '';
  description: string = '';
  instruction: string | null = null;

  severity: string = '';
  certainty: string = '';
  urgency: string = '';

  effective: string = '';
  expires: string = '';

  areaDesc: string = '';
}
