export const api = {
  completedMinutes: {
    update(newValue: number) {
      console.log("updating REAL api!");
      return new Promise<ApiResponse>((res) =>
        window.setTimeout(() => res({ status: 200, value: newValue }), 1000)
      );
    },
  },
  totalMinutes: {
    update(newValue: number) {
      console.log("updating REAL api!");
      return new Promise<ApiResponse>((res) =>
        window.setTimeout(() => res({ status: 200, value: newValue }), 1000)
      );
    },
  },
};

interface ApiResponse {
  status: number;
  value: number;
}
