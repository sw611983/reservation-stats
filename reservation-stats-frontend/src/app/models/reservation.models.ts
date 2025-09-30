// A restaurant entry from /api/restaurants
export interface Restaurant {
  id: number;
  name: string;
}

// Grouped counts for one weekday
export interface WeekdayGroupCounts {
  total: number;
  groups: Record<string, number>; // groupSize -> count
}

// Stats response from /api/stats
export interface StatsResponse {
  restaurantId: number;
  from: string;
  to: string;
  weekdayGroupCounts: Record<string, WeekdayGroupCounts>; // e.g., "Monday": {total:..., groups:{...}}
  weekdayBucketCounts: Record<string, Record<string, number>>; // e.g., "Monday": { "1-2": 5, "3-4": 2 }
  groupSizes: number[];
  buckets: string[];
}
