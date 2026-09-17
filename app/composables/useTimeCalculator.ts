export type TimeCalcMode = "sum" | "addToClock";

export interface DurationEntry {
  id: string;
  hours: number;
  minutes: number;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `duration-${idCounter}`;
}

/**
 * Dua mode: (1) menjumlahkan beberapa durasi jadi total jam+menit, dan
 * (2) menambahkan durasi ke jam tertentu untuk mendapat jam hasil, termasuk
 * info kalau hasilnya lewat tengah malam (hari berikutnya).
 */
export function useTimeCalculator() {
  const mode = ref<TimeCalcMode>("sum");

  const durations = ref<DurationEntry[]>([
    { id: nextId(), hours: 1, minutes: 30 },
  ]);

  function addDuration() {
    durations.value.push({ id: nextId(), hours: 0, minutes: 0 });
  }

  function removeDuration(id: string) {
    durations.value = durations.value.filter((d) => d.id !== id);
  }

  const totalMinutesSum = computed(() =>
    durations.value.reduce(
      (sum, d) => sum + (d.hours || 0) * 60 + (d.minutes || 0),
      0,
    ),
  );

  const sumFormatted = computed(() => {
    const h = Math.floor(totalMinutesSum.value / 60);
    const m = totalMinutesSum.value % 60;
    return `${h} jam ${m} menit`;
  });

  const startTime = ref("09:00");
  const durationHours = ref(1);
  const durationMinutes = ref(30);

  const resultClock = computed<{ time: string; daysOver: number } | null>(
    () => {
      const match = /^(\d{1,2}):(\d{2})$/.exec(startTime.value);
      if (!match) return null;

      const startMinutes = Number(match[1]) * 60 + Number(match[2]);
      const totalMinutes =
        startMinutes +
        (durationHours.value || 0) * 60 +
        (durationMinutes.value || 0);
      const normalized = ((totalMinutes % 1440) + 1440) % 1440;
      const daysOver = Math.floor(totalMinutes / 1440);
      const h = Math.floor(normalized / 60);
      const m = normalized % 60;

      return {
        time: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
        daysOver,
      };
    },
  );

  return {
    mode,
    durations,
    addDuration,
    removeDuration,
    totalMinutesSum,
    sumFormatted,
    startTime,
    durationHours,
    durationMinutes,
    resultClock,
  };
}
