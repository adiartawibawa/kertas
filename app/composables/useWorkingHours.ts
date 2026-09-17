export interface ShiftEntry {
  id: string;
  start: string;
  end: string;
  breakMinutes: number;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `shift-${idCounter}`;
}

function timeToMinutes(time: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

/**
 * Menghitung total jam kerja dari beberapa shift/hari, masing-masing
 * dengan waktu mulai, waktu selesai, dan durasi istirahat. Shift yang
 * melewati tengah malam (misal 22:00 - 06:00) dihitung otomatis.
 */
export function useWorkingHours() {
  const shifts = ref<ShiftEntry[]>([
    { id: nextId(), start: "09:00", end: "17:00", breakMinutes: 60 },
  ]);

  function addShift() {
    shifts.value.push({
      id: nextId(),
      start: "09:00",
      end: "17:00",
      breakMinutes: 60,
    });
  }

  function removeShift(id: string) {
    shifts.value = shifts.value.filter((s) => s.id !== id);
  }

  const shiftMinutes = computed(() =>
    shifts.value.map((shift) => {
      const start = timeToMinutes(shift.start);
      const end = timeToMinutes(shift.end);
      if (start === null || end === null) return 0;
      let duration = end - start;
      if (duration < 0) duration += 24 * 60;
      return Math.max(0, duration - (shift.breakMinutes || 0));
    }),
  );

  const totalMinutes = computed(() =>
    shiftMinutes.value.reduce((sum, m) => sum + m, 0),
  );

  const totalFormatted = computed(() => {
    const h = Math.floor(totalMinutes.value / 60);
    const m = totalMinutes.value % 60;
    return `${h} jam ${m} menit`;
  });

  return {
    shifts,
    addShift,
    removeShift,
    shiftMinutes,
    totalMinutes,
    totalFormatted,
  };
}
