export type UserStats = {
  plan: "FREE" | "PREMIUM";
  totalClones: number;
  totalChats: number;
  remainingCredits: number;
  usage: {
    cloneProgress: number;
    chatProgress: number;
    creditProgress: number;
  };
};

export type StatsResponse = {
  success: true;
  stats: UserStats;
};
