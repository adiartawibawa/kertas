export type BusinessDaysMode = "count" | "add";

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

/**
 * Menghitung hari kerja (Senin-Jumat) antara dua tanggal, atau menambahkan
 * sejumlah hari kerja ke sebuah tanggal awal. Hari libur nasional TIDAK
 * diperhitungkan — hanya akhir pekan (Sabtu & Minggu).
 */
export function useBusinessDays() {
  const mode = ref<BusinessDaysMode>("count");

  const startDate = ref("");
  const endDate = ref("");
  const daysToAdd = ref<number | null>(null);

  const businessDaysCount = computed<number | null>(() => {
    if (!startDate.value || !endDate.value) return null;
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
      return null;

    const [from, to] = start <= end ? [start, end] : [end, start];
    let count = 0;
    const cursor = new Date(from);
    while (cursor <= to) {
      if (!isWeekend(cursor)) count++;
      cursor.setDate(cursor.getDate() + 1);
    }
    return count;
  });

  const resultDate = computed<string | null>(() => {
    if (
      !startDate.value ||
      daysToAdd.value === null ||
      Number.isNaN(daysToAdd.value)
    )
      return null;
    const start = new Date(startDate.value);
    if (Number.isNaN(start.getTime())) return null;

    let remaining = Math.abs(Math.round(daysToAdd.value));
    const direction = daysToAdd.value >= 0 ? 1 : -1;
    const cursor = new Date(start);

    while (remaining > 0) {
      cursor.setDate(cursor.getDate() + direction);
      if (!isWeekend(cursor)) remaining--;
    }

    return cursor.toISOString().slice(0, 10);
  });

  return { mode, startDate, endDate, daysToAdd, businessDaysCount, resultDate };
}
