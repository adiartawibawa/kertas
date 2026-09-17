export interface DateBreakdown {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
}

/**
 * Menghitung selisih dua tanggal dalam breakdown tahun/bulan/hari, sekaligus
 * total hari dan total minggu.
 */
export function useDateDifference() {
  const startDate = ref("");
  const endDate = ref("");

  const breakdown = computed<DateBreakdown | null>(() => {
    if (!startDate.value || !endDate.value) return null;

    let start = new Date(startDate.value);
    let end = new Date(endDate.value);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()))
      return null;

    if (start > end) {
      const tmp = start;
      start = end;
      end = tmp;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);

    return { years, months, days, totalDays, totalWeeks };
  });

  return { startDate, endDate, breakdown };
}
