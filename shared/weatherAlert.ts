export class NwsAlertCollection {
  features: NwsAlertFeature[] = [];
  title: string = '';
  updated: string = '';
}

export class NwsAlertFeature {
  id: string = '';
  properties: NwsAlert = new NwsAlert();
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

export const fakeWeatherAlerts: NwsAlertCollection = {
  features: [
    {
      id: 'fake-severe-thunderstorm-warning',
      properties: {
        event: 'Severe Thunderstorm Warning',
        headline:
          'Severe Thunderstorm Warning issued for portions of the local area.',
        description:
          'A severe thunderstorm capable of producing damaging winds and large hail was located near the area and is moving east.',
        instruction:
          'Move to an interior room on the lowest floor of a sturdy building. Avoid windows.',
        severity: 'Severe',
        certainty: 'Observed',
        urgency: 'Immediate',
        effective: '2026-11-06T18:00:00-05:00',
        expires: '2026-11-06T19:00:00-05:00',
        areaDesc: 'Montgomery County, OH',
      },
    },
    {
      id: 'fake-flood-advisory',
      properties: {
        event: 'Flood Advisory',
        headline:
          'Flood Advisory issued for low-lying and poor drainage areas.',
        description:
          'Heavy rainfall may cause minor flooding of roads, creeks, and low-lying areas.',
        instruction:
          'Turn around, do not drown when encountering flooded roads.',
        severity: 'Minor',
        certainty: 'Likely',
        urgency: 'Expected',
        effective: '2026-11-06T17:30:00-05:00',
        expires: '2026-11-06T21:00:00-05:00',
        areaDesc: 'Dayton and surrounding areas',
      },
    },
  ],
  title: 'Fake weather alerts for testing',
  updated: '2026-11-06T18:00:00-05:00',
};
