const root = document.documentElement;

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (!reduceMotion.matches) {
  const orbs = [
    {
      xVar: "--orb1-x",
      yVar: "--orb1-y",
      baseX: 86,
      baseY: 8,
      ampX: 7,
      ampY: 6,
      speed: 0.000253,  // orb 1
      phase: 0
    },
    {
      xVar: "--orb2-x",
      yVar: "--orb2-y",
      baseX: 10,
      baseY: 30,
      ampX: 8,
      ampY: 7,
      speed: 0.000207,  // orb 2
      phase: 1.4
    },
    {
      xVar: "--orb3-x",
      yVar: "--orb3-y",
      baseX: 67,
      baseY: 43,
      ampX: 9,
      ampY: 8,
      speed: 0.000230,  // orb 3
      phase: 2.2
    },
    {
      xVar: "--orb4-x",
      yVar: "--orb4-y",
      baseX: 20,
      baseY: 72,
      ampX: 7,
      ampY: 9,
      speed: 0.000196,  // orb 4
      phase: 3.1
    },
    {
      xVar: "--orb5-x",
      yVar: "--orb5-y",
      baseX: 88,
      baseY: 82,
      ampX: 8,
      ampY: 7,
      speed: 0.000242,  // orb 5
      phase: 4.3
    }
  ];

  function animateOrbs(time) {
    for (const orb of orbs) {
      const x =
        orb.baseX +
        Math.sin(time * orb.speed + orb.phase) * orb.ampX;

      const y =
        orb.baseY +
        Math.cos(time * orb.speed * 0.85 + orb.phase) * orb.ampY;

      root.style.setProperty(
        orb.xVar,
        `${x.toFixed(2)}%`
      );

      root.style.setProperty(
        orb.yVar,
        `${y.toFixed(2)}%`
      );
    }

    requestAnimationFrame(animateOrbs);
  }

  requestAnimationFrame(animateOrbs);
}
