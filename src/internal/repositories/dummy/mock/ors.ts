const footWalking = {
  type: 'FeatureCollection',
  bbox: [126.912082, 33.448953, 126.918246, 33.450675],
  features: [
    {
      bbox: [126.912082, 33.448953, 126.918246, 33.450675],
      type: 'Feature',
      properties: {
        segments: [
          {
            distance: 760.4,
            duration: 547.5,
            steps: [
              {
                distance: 158.9,
                duration: 114.4,
                type: 11,
                instruction: 'Head west on 동류암로',
                name: '동류암로',
                way_points: [0, 5],
              },
              {
                distance: 106.6,
                duration: 76.8,
                type: 3,
                instruction: 'Turn sharp right',
                name: '-',
                way_points: [5, 6],
              },
              { distance: 141.4, duration: 101.8, type: 0, instruction: 'Turn left', name: '-', way_points: [6, 8] },
              {
                distance: 26.2,
                duration: 18.8,
                type: 1,
                instruction: 'Turn right onto 고성오조로',
                name: '고성오조로',
                way_points: [8, 9],
              },
              { distance: 171.7, duration: 123.7, type: 0, instruction: 'Turn left', name: '-', way_points: [9, 15] },
              {
                distance: 100.6,
                duration: 72.4,
                type: 0,
                instruction: 'Turn left onto 고성동서로',
                name: '고성동서로',
                way_points: [15, 17],
              },
              { distance: 4.0, duration: 2.9, type: 1, instruction: 'Turn right', name: '-', way_points: [17, 18] },
              {
                distance: 13.9,
                duration: 10.0,
                type: 0,
                instruction: 'Turn left onto 올레길2',
                name: '올레길2',
                way_points: [18, 21],
              },
              {
                distance: 6.4,
                duration: 4.6,
                type: 0,
                instruction: 'Turn left onto 올레길2',
                name: '올레길2',
                way_points: [21, 22],
              },
              {
                distance: 11.3,
                duration: 8.1,
                type: 1,
                instruction: 'Turn right onto 일주동로, 1132',
                name: '일주동로, 1132',
                way_points: [22, 23],
              },
              { distance: 19.2, duration: 13.9, type: 1, instruction: 'Turn right', name: '-', way_points: [23, 25] },
              {
                distance: 0.0,
                duration: 0.0,
                type: 10,
                instruction: 'Arrive at your destination, on the right',
                name: '-',
                way_points: [25, 25],
              },
            ],
          },
        ],
        way_points: [0, 25],
        summary: { distance: 760.4, duration: 547.5 },
      },
      geometry: {
        coordinates: [
          [126.918246, 33.449465],
          [126.917985, 33.449429],
          [126.917701, 33.449365],
          [126.917089, 33.449173],
          [126.916883, 33.449082],
          [126.916666, 33.448953],
          [126.916366, 33.449879],
          [126.915579, 33.449752],
          [126.914868, 33.449644],
          [126.914799, 33.449872],
          [126.914692, 33.449871],
          [126.914181, 33.449963],
          [126.913831, 33.450053],
          [126.913592, 33.450033],
          [126.913442, 33.450227],
          [126.913302, 33.450483],
          [126.912813, 33.450425],
          [126.912233, 33.450338],
          [126.912228, 33.450374],
          [126.912196, 33.45038],
          [126.912172, 33.450409],
          [126.912162, 33.450472],
          [126.912093, 33.450467],
          [126.912082, 33.450569],
          [126.912179, 33.450588],
          [126.912202, 33.450675],
        ],
        type: 'LineString',
      },
    },
  ],
  metadata: {
    attribution: 'openrouteservice.org | OpenStreetMap contributors',
    service: 'routing',
    timestamp: 1732852533895,
    query: {
      coordinates: [
        [126.918168422686, 33.4498632234159],
        [126.91235667903, 33.4506476206926],
      ],
      profile: 'foot-walking',
      format: 'json',
    },
    engine: { version: '8.2.0', build_date: '2024-10-09T09:23:42Z', graph_date: '2024-09-18T16:11:38Z' },
  },
};

export const dummies = { footWalking };
