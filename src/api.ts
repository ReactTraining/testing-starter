export const api = {
  completedMinutes: {
    update(newValue: number) {
      console.log("updating");
      return new Promise<ApiResponse>((res) =>
        window.setTimeout(() => res({ status: 200, value: newValue }), 3000)
      );
    },
  },
  totalMinutes: {
    update(newValue: number) {
      console.log("updating");
      return new Promise<ApiResponse>((res) =>
        window.setTimeout(() => res({ status: 200, value: newValue }), 3000)
      );
    },
  },
};

interface ApiResponse {
  status: number;
  value: number;
}
